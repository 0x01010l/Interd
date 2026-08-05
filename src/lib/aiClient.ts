const RATE_KEY = 'interdot_ai_daily_rate';
const HISTORY_PREFIX = 'interdot_tool_history_';
const DAILY_LIMIT = 20;

type RateState = {
  day: string;
  count: number;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getDailyRemaining(): number {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    if (!raw) return DAILY_LIMIT;
    const parsed = JSON.parse(raw) as RateState;
    if (parsed.day !== todayKey()) return DAILY_LIMIT;
    return Math.max(0, DAILY_LIMIT - (parsed.count || 0));
  } catch {
    return DAILY_LIMIT;
  }
}

export function incrementDailyUsage() {
  try {
    const day = todayKey();
    const raw = localStorage.getItem(RATE_KEY);
    let count = 1;
    if (raw) {
      const parsed = JSON.parse(raw) as RateState;
      count = parsed.day === day ? (parsed.count || 0) + 1 : 1;
    }
    localStorage.setItem(RATE_KEY, JSON.stringify({ day, count }));
  } catch {
    // ignore storage failures
  }
}

export type HistoryItem = {
  id: string;
  prompt: string;
  result: string;
  createdAt: string;
};

export function loadHistory(toolSlug: string): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_PREFIX + toolSlug);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  } catch {
    return [];
  }
}

export function saveHistory(toolSlug: string, item: Omit<HistoryItem, 'id' | 'createdAt'>) {
  try {
    const prev = loadHistory(toolSlug);
    const next: HistoryItem[] = [
      {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...item,
      },
      ...prev,
    ].slice(0, 20);
    localStorage.setItem(HISTORY_PREFIX + toolSlug, JSON.stringify(next));
    return next;
  } catch {
    return loadHistory(toolSlug);
  }
}

export type GenerateResponse = {
  result?: string;
  error?: string;
  code?: string;
  demo?: boolean;
  cached?: boolean;
  remaining?: number;
};

export async function generateWithAzure(params: {
  prompt: string;
  systemPrompt: string;
  toolName: string;
}): Promise<GenerateResponse> {
  const remaining = getDailyRemaining();
  if (remaining <= 0) {
    return {
      error: 'Daily limit reached (20 free generations per day). Please try again tomorrow.',
      code: 'rate_limit',
      demo: true,
    };
  }

  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = (await res.json()) as GenerateResponse;

    if (res.ok && data.result) {
      incrementDailyUsage();
      return data;
    }

    return {
      ...data,
      demo: true,
      error: data.error || 'Generation failed. Please try again.',
    };
  } catch {
    return {
      error: 'Could not reach the AI service. Please try again.',
      code: 'network',
      demo: true,
    };
  }
}
