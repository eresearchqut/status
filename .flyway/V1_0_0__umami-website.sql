INSERT INTO website (website_id, name, domain, user_id, created_by, created_at, updated_at)
SELECT '8c4453a6-4c48-4889-9e89-f3b4f13753bb', 'Status', 'localhost:3000', users.user_id, users.user_id, current_timestamp, current_timestamp
FROM "user" as users
WHERE users.username = 'admin'
  ON CONFLICT (website_id)
DO NOTHING
