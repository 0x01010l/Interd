import type { Request, Response } from 'express';

type GenerateBody = {
  prompt?: string;
  systemPrompt?: string;
  toolName?: string;
};

type CacheEntry = {
  result: string;
  expiresAt: number;
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const DAILY_LIMIT = 20;

const memoryCache = new Map<string, CacheEntry>();
const ipUsage = new Map<string, { count: number; day: string }>();

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function cacheKey(prompt: string, systemPrompt: string, toolName: string) {
  return `${toolName}::${systemPrompt}::${prompt}`.toLowerCase().trim();
}

function getCached(key: string): string | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.result;
}

function setCache(key: string, result: string) {
  memoryCache.set(key, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

function checkIpLimit(ip: string): { allowed: boolean; remaining: number } {
  const day = todayKey();
  const current = ipUsage.get(ip);
  if (!current || current.day !== day) {
    ipUsage.set(ip, { count: 0, day });
    return { allowed: true, remaining: DAILY_LIMIT };
  }
  const remaining = Math.max(0, DAILY_LIMIT - current.count);
  return { allowed: current.count < DAILY_LIMIT, remaining };
}

function incrementIp(ip: string) {
  const day = todayKey();
  const current = ipUsage.get(ip);
  if (!current || current.day !== day) {
    ipUsage.set(ip, { count: 1, day });
    return;
  }
  current.count += 1;
}

function friendlyError(status: number, message: string): { status: number; error: string; code: string } {
  const lower = message.toLowerCase();
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

export async function handleAiGenerate(req: Request, res: Response) {
  try {
    const body = (req.body || {}) as GenerateBody;
    const prompt = (body.prompt || '').trim();
    const systemPrompt = (body.systemPrompt || '').trim();
    const toolName = (body.toolName || 'tool').trim();

    if (!prompt) {
      return res.status(400).json({ error: 'Please enter a prompt before generating.', code: 'validation' });
    }

    if (prompt.length > 8000) {
      return res.status(400).json({ error: 'Prompt is too long. Please keep it under 8,000 characters.', code: 'validation' });
    }

    const ip = getClientIp(req);
    const limit = checkIpLimit(ip);
    if (!limit.allowed) {
      return res.status(429).json({
        error: 'Daily limit reached (20 free generations per day). Please try again tomorrow.',
        code: 'rate_limit',
        remaining: 0,
      });
    }

    const key = cacheKey(prompt, systemPrompt, toolName);
    const cached = getCached(key);
    if (cached) {
      return res.json({
        result: cached,
        cached: true,
        remaining: limit.remaining,
      });
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini';
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

    if (!endpoint || !apiKey) {
      return res.status(503).json({
        error: 'AI service is not configured yet. Showing demo output instead.',
        code: 'not_configured',
        demo: true,
      });
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
      return res.status(friendly.status).json({
        error: friendly.error,
        code: friendly.code,
        demo: true,
      });
    }

    const data = (await azureRes.json()) as {
      choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
    };

    const choice = data.choices?.[0];
    if (choice?.finish_reason === 'content_filter') {
      return res.status(400).json({
        error: 'Your request was blocked by the content filter. Please revise your prompt and avoid sensitive or restricted topics.',
        code: 'content_filter',
        demo: true,
      });
    }

    const result = choice?.message?.content?.trim();
    if (!result) {
      return res.status(502).json({
        error: 'No content was returned. Please try a more specific prompt.',
        code: 'empty',
        demo: true,
      });
    }

    setCache(key, result);
    incrementIp(ip);

    return res.json({
      result,
      cached: false,
      remaining: Math.max(0, limit.remaining - 1),
    });
  } catch (err) {
    console.error('[ai/generate]', err);
    return res.status(500).json({
      error: 'Something went wrong while generating. Please try again in a moment.',
      code: 'error',
      demo: true,
    });
  }
}
