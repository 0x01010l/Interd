import { app } from '@azure/functions';

const CACHE_TTL_MS = 60 * 60 * 1000;
const DAILY_LIMIT = 3;
const memoryCache = new Map();
const ipUsage = new Map();

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function cacheKey(prompt, systemPrompt, toolName) {
  return `${toolName}::${systemPrompt}::${prompt}`.toLowerCase().trim();
}

function getCached(key) {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.result;
}

function setCache(key, result) {
  memoryCache.set(key, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

function checkIpLimit(ip) {
  const day = todayKey();
  const current = ipUsage.get(ip);
  if (!current || current.day !== day) {
    ipUsage.set(ip, { count: 0, day });
    return { allowed: true, remaining: DAILY_LIMIT };
  }
  return { allowed: current.count < DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - current.count) };
}

function incrementIp(ip) {
  const day = todayKey();
  const current = ipUsage.get(ip);
  if (!current || current.day !== day) {
    ipUsage.set(ip, { count: 1, day });
    return;
  }
  current.count += 1;
}

function friendlyError(status, message) {
  const lower = String(message || '').toLowerCase();
  if (status === 429 || lower.includes('quota') || lower.includes('rate')) {
    return {
      status: 429,
      code: 'quota',
      error: 'We have reached our daily AI usage limit. Please try again tomorrow, or use the demo output shown below.',
    };
  }
  if (status === 400 && (lower.includes('content') || lower.includes('filter') || lower.includes('policy'))) {
    return {
      status: 400,
      code: 'content_filter',
      error: 'Your request was blocked by the content filter. Please revise your prompt and avoid sensitive or restricted topics.',
    };
  }
  return {
    status: status || 500,
    code: 'error',
    error: 'Something went wrong while generating. Please try again in a moment.',
  };
}

app.http('aiGenerate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'ai/generate',
  handler: async (request, context) => {
    try {
      const body = (await request.json()) || {};
      const prompt = String(body.prompt || '').trim();
      const systemPrompt = String(body.systemPrompt || '').trim();
      const toolName = String(body.toolName || 'tool').trim();

      if (!prompt) {
        return { status: 400, jsonBody: { error: 'Please enter a prompt before generating.', code: 'validation' } };
      }
      if (prompt.length > 8000) {
        return { status: 400, jsonBody: { error: 'Prompt is too long. Please keep it under 8,000 characters.', code: 'validation' } };
      }

      const ip = getClientIp(request);
      const limit = checkIpLimit(ip);
      if (!limit.allowed) {
        return {
          status: 429,
          jsonBody: {
            error: 'Daily limit reached (3 free generations per day). Please try again tomorrow.',
            code: 'rate_limit',
            remaining: 0,
          },
        };
      }

      const key = cacheKey(prompt, systemPrompt, toolName);
      const cached = getCached(key);
      if (cached) {
        return { status: 200, jsonBody: { result: cached, cached: true, remaining: limit.remaining } };
      }

      const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
      const apiKey = process.env.AZURE_OPENAI_API_KEY;
      const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini';
      const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

      if (!endpoint || !apiKey) {
        return {
          status: 503,
          jsonBody: {
            error: 'AI service is not configured yet. Showing demo output instead.',
            code: 'not_configured',
            demo: true,
          },
        };
      }

      const url = `${endpoint.replace(/\/$/, '')}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
      const azureRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      });

      if (!azureRes.ok) {
        const text = await azureRes.text();
        const friendly = friendlyError(azureRes.status, text);
        return { status: friendly.status, jsonBody: { error: friendly.error, code: friendly.code, demo: true } };
      }

      const data = await azureRes.json();
      const choice = data.choices?.[0];
      if (choice?.finish_reason === 'content_filter') {
        return {
          status: 400,
          jsonBody: {
            error: 'Your request was blocked by the content filter. Please revise your prompt and avoid sensitive or restricted topics.',
            code: 'content_filter',
            demo: true,
          },
        };
      }

      const result = choice?.message?.content?.trim();
      if (!result) {
        return {
          status: 502,
          jsonBody: { error: 'No content was returned. Please try a more specific prompt.', code: 'empty', demo: true },
        };
      }

      setCache(key, result);
      incrementIp(ip);

      return {
        status: 200,
        jsonBody: { result, cached: false, remaining: Math.max(0, limit.remaining - 1) },
      };
    } catch (err) {
      context.error(err);
      return {
        status: 500,
        jsonBody: {
          error: 'Something went wrong while generating. Please try again in a moment.',
          code: 'error',
          demo: true,
        },
      };
    }
  },
});
