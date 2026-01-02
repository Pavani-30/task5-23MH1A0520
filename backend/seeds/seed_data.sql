-- =========================
-- SUPER ADMIN (NO TENANT)
-- =========================
INSERT INTO users (
  id,
  tenant_id,
  email,
  password_hash,
  full_name,
  role,
  is_active
)
VALUES (
  gen_random_uuid(),
  NULL,
  'superadmin@system.com',
  '$2a$10$7yQy6Uu6h0pNqvM8q6K8A.Ov9hXnZzQG5Fq8oQXWQxj6QFzv0gZ0y',
  'Super Admin',
  'super_admin',
  true
);

-- =========================
-- TENANT
-- =========================
INSERT INTO tenants (
  id,
  name,
  subdomain,
  status,
  subscription_plan
)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Demo Company',
  'demo',
  'active',
  'pro'
);

-- =========================
-- TENANT ADMIN
-- =========================
INSERT INTO users (
  id,
  tenant_id,
  email,
  password_hash,
  full_name,
  role,
  is_active
)
VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'admin@demo.com',
  '$2a$10$Qx0Zb8d4pC7V9yKp9C3xUuH5sP6oGZr8P8EJ5oKJ5R3Xn5T0bHq7S',
  'Demo Admin',
  'tenant_admin',
  true
);

-- =========================
-- TENANT USERS
-- =========================
INSERT INTO users (
  id,
  tenant_id,
  email,
  password_hash,
  full_name,
  role,
  is_active
)
VALUES
(
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'user1@demo.com',
  '$2a$10$YpPpYcR7FJQJ6cZxNQmHkO7vYqZB9D0Z6TgCk8KJ0G6X1JX9pQ9u',
  'User One',
  'user',
  true
),
(
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'user2@demo.com',
  '$2a$10$YpPpYcR7FJQJ6cZxNQmHkO7vYqZB9D0Z6TgCk8KJ0G6X1JX9pQ9u',
  'User Two',
  'user',
  true
);

-- =========================
-- PROJECTS
-- =========================
INSERT INTO projects (
  id,
  tenant_id,
  name
)
VALUES
(
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'Project Alpha'
),
(
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'Project Beta'
);
