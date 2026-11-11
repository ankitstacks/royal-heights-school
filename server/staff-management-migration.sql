
BEGIN;

-- Add staff permissions and password-change requirement.
ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS permissions JSONB
NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN
NOT NULL DEFAULT FALSE;

-- Version used to invalidate existing staff sessions.
ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS session_version INTEGER
NOT NULL DEFAULT 1;

-- Store only hashed invitation/reset tokens.
CREATE TABLE IF NOT EXISTS staff_account_tokens (
    id BIGSERIAL PRIMARY KEY,
    admin_user_id BIGINT NOT NULL
        REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    purpose VARCHAR(30) NOT NULL
        CHECK (purpose IN ('invitation', 'password_reset')),
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_by BIGINT
        REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_tokens_user
ON staff_account_tokens(admin_user_id);

CREATE INDEX IF NOT EXISTS idx_staff_tokens_expiry
ON staff_account_tokens(expires_at);

COMMIT;
