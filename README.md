# HN Vocab MCP

A small **Next.js 15** app that exposes your Google Sheet vocabulary tab as an **MCP** endpoint for ChatGPT.

When you tag this connector in ChatGPT, it loads your full review list, tells you the count, shows practice options (quiz, reading, voice, flashcards, …), and asks what you want to do.

## Stack

- Next.js `15.5.29` (stable App Router)
- `mcp-handler` + `@modelcontextprotocol/server`
- Google Apps Script Web App → Sheet tab `vocab`

## Quick start

```bash
pnpm install
cp .env.example .env.local   # then fill SHEETS_WEB_APP_URL + SYNC_TOKEN
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

MCP endpoint: [http://localhost:3000/api/mcp](http://localhost:3000/api/mcp)

## Environment

| Variable | Description |
|---|---|
| `SHEETS_WEB_APP_URL` | Apps Script deploy URL ending in `/exec` |
| `SYNC_TOKEN` | Same value as Script property `SYNC_TOKEN` |

See `google-apps-script/Code.gs` for the Sheet backend (`action=load` on tab `vocab`).

## MCP tools

| Tool | Purpose |
|---|---|
| `get_vocab_list` | Load all rows + practice options |
| `get_vocab_count` | Return item count only |

## Connect to ChatGPT

ChatGPT needs a **public HTTPS** URL for MCP connectors.

### Option A — Deploy (recommended)

1. Deploy this app (Vercel or similar).
2. Set `SHEETS_WEB_APP_URL` and `SYNC_TOKEN` in the host env.
3. In ChatGPT: **Settings → Connectors / Advanced → MCP servers** (wording may vary).
4. Add connector URL: `https://<your-domain>/api/mcp`
5. Start a chat, enable the connector, ask e.g. *“Load my vocab and help me practice.”*

### Option B — Local tunnel

```bash
pnpm dev
# in another terminal
npx ngrok http 3000
```

Use the ngrok HTTPS URL + `/api/mcp` as the connector endpoint.

## Apps Script checklist

1. Spreadsheet has a tab named exactly `vocab` (header row on top).
2. Paste `google-apps-script/Code.gs` into **Extensions → Apps Script**.
3. Script property: `SYNC_TOKEN` = your secret.
4. Deploy → Web app → Execute as **Me**, access **Anyone**.
5. After code changes: **Manage deployments → Edit → New version**.

## Project layout

```
src/app/page.tsx          Landing page
src/app/api/mcp/route.ts  MCP Streamable HTTP endpoint
src/lib/sheets.ts         Apps Script client
src/lib/mcp/tools.ts      Tool registration
google-apps-script/       Sheet bridge
```
