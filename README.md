# NODE — Discord bot + dashboard

NODE is a Discord.js v14 bot with a React dashboard, PostgreSQL persistence, moderation, server utilities, role/channel management, text tools, fun commands, welcome/logging settings, automod, and private purchase tickets.

## Command layout

Discord limits each chat-input command to 25 subcommands, so NODE groups its command actions under 8 slash-command roots instead of registering hundreds of top-level commands:

- `/text` — 25 text transformations and formatting tools
- `/utility` — 25 utility actions
- `/server` — 25 server information actions
- `/moderation` — 25 moderation actions
- `/roles` — 25 role actions
- `/channels` — 25 channel actions
- `/fun` — 25 fun actions
- `/config` — 25 configuration/status actions

That is 200 grouped command actions. The separate `/ticket-panel` command is also available. For example, use `/utility ping`, `/moderation ban`, and `/config welcome-on`. Some actions require the matching Discord permission and bot role hierarchy. Channel types and role features are also subject to Discord API support.

## Stack

Node.js 20+, discord.js v14, Express 5, React, Vite, PostgreSQL.

## Discord setup

1. Create an application and bot in the Discord Developer Portal.
2. Enable Server Members Intent and Message Content Intent.
3. Add the OAuth2 redirect URL: `https://YOUR-DOMAIN/auth/callback`.
4. Invite with the `bot` and `applications.commands` scopes. Grant only permissions needed by the modules you enable.

## Environment

Copy `.env.example` to `.env` and configure:

- `BOT_TOKEN`
- `CLIENT_ID`
- `CLIENT_SECRET`
- `CALLBACK_URL`
- `DASHBOARD_ORIGIN`
- `SESSION_SECRET`
- `DATABASE_URL`

Never commit `.env` or share bot tokens and OAuth secrets.

## Run locally

```bash
npm install
npm run build
npm start
```

The bot and dashboard/API run in one process on `PORT` (default 3000).

## Wispbyte deployment

1. Create a Node.js service and a PostgreSQL database.
2. Connect this GitHub repository.
3. Set build command to `npm install && npm run build`.
4. Set startup command to `npm start`.
5. Add the environment variables above and expose the assigned `PORT`.
6. Use the PostgreSQL connection string provided by Wispbyte.

## Dashboard

Sign in with Discord. Servers are shown only when the signed-in user has Manage Server permission and NODE is installed. The current dashboard configures the available welcome, logging, automod, and ticket settings.

## Important notes

- Slash commands are registered globally unless `DEV_GUILD_ID` is set. Global command updates can take time to appear; set `DEV_GUILD_ID` while testing in one server.
- Automod is a basic first version, not a replacement for Discord AutoMod.
- Keep the dashboard behind HTTPS and use a long random session secret.
- Test permissions and role hierarchy in a private test server before enabling moderation features.
