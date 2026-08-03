
# Interdot

Reasoning-as-a-Service website plus a free ecommerce AI tools suite (Azure OpenAI).

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and fill in Azure OpenAI values (optional — tools show demo output without a key)
3. Start the app (Vite + `/api/ai/generate` on one port):
   `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Production

```bash
npm run build
npm start
```

## AI API

`POST /api/ai/generate` body: `{ prompt, systemPrompt, toolName }`

- Azure OpenAI only (key stays on the server)
- 3 generations / day / IP
- Identical prompts cached in memory for 1 hour
- Friendly errors for quota / content filter; client falls back to demo copy
