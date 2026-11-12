# NODE — Discord bot and dashboard

A modular Discord bot with moderation, welcome messages, server logs, basic automod, private tickets, a React dashboard, and PostgreSQL persistence.

## Stack
Node.js 20+, discord.js v14, Express, React/Vite, PostgreSQL.

## Discord setup
1. Create an application and bot in the Discord Developer Portal.
2. Enable Server Members Intent and Message Content Intent.
3. Add OAuth2 redirect URL: https://YOUR-DOMAIN/auth/callback
4. Invite with bot and applications.commands scopes. Grant only the permissions required by enabled modules.

## Environment
Copy .env.example to .env and fill BOT_TOKEN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, DASHBOARD_ORIGIN, SESSION_SECRET, and DATABASE_URL. Never commit .env or share tokens.

## Run
npm install
npm run build
npm start

The bot and dashboard/API run in one process on PORT (default 3000).

## Wispbyte
Create a Node.js service and PostgreSQL database. Connect this repository, set build command to npm install && npm run build, startup command to npm start, expose the assigned PORT, and add the environment variables above. Use the PostgreSQL connection string provided by your database service.

## Commands
ping, serverinfo, userinfo, ban, kick, timeout, untimeout, purge, warn, warnings, welcome, logs, automod, ticket-panel.

## Dashboard
Sign in with Discord. Only servers where you have Manage Server permission and NODE is installed are shown. Configure module switches, welcome/log channels, and the welcome message.

## Notes
Automod currently removes Discord invite links and repeated-character spam. It is a basic first version, not a replacement for Discord AutoMod. Keep the dashboard behind HTTPS and use a strong session secret.
