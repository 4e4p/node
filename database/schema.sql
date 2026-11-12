CREATE TABLE IF NOT EXISTS guild_settings (
 guild_id TEXT PRIMARY KEY,
 welcome_enabled BOOLEAN NOT NULL DEFAULT FALSE,
 welcome_channel_id TEXT,
 welcome_message TEXT NOT NULL DEFAULT 'Welcome {user} to {server}!',
 logs_enabled BOOLEAN NOT NULL DEFAULT FALSE,
 logs_channel_id TEXT,
 automod_enabled BOOLEAN NOT NULL DEFAULT FALSE,
 tickets_enabled BOOLEAN NOT NULL DEFAULT TRUE,
 ticket_category_id TEXT,
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS moderation_cases (
 id BIGSERIAL PRIMARY KEY,
 guild_id TEXT NOT NULL,
 user_id TEXT NOT NULL,
 moderator_id TEXT NOT NULL,
 action TEXT NOT NULL,
 reason TEXT NOT NULL DEFAULT 'No reason provided',
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS moderation_cases_lookup ON moderation_cases(guild_id,user_id,created_at DESC);
