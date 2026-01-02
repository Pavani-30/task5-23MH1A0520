const db = require('../config/db');
const bcrypt = require('bcrypt');
const { logAudit } = require('../services/audit.service');

exports.addUser = async (req, res) => {
  const { email, password, fullName, role = 'user' } = req.body;
  const tenantId = req.params.tenantId;

  const count = await db.query(
    'SELECT COUNT(*) FROM users WHERE tenant_id=$1',
    [tenantId]
  );

  const tenant = await db.query(
    'SELECT max_users FROM tenants WHERE id=$1',
    [tenantId]
  );

  if (parseInt(count.rows[0].count) >= tenant.rows[0].max_users) {
    return res.status(403).json({ success: false, message: 'User limit reached' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await db.query(
    `INSERT INTO users (tenant_id,email,password_hash,full_name,role)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id,email,full_name,role,is_active,created_at`,
    [tenantId, email, hash, fullName, role]
  );

  await logAudit({
    tenantId,
    userId: req.user.userId,
    action: 'CREATE_USER',
    entityType: 'user',
    entityId: user.rows[0].id,
    ip: req.ip
  });

  res.status(201).json({ success: true, data: user.rows[0] });
};

exports.listUsers = async (req, res) => {
  const tenantId = req.params.tenantId;

  const users = await db.query(
    `SELECT id,email,full_name,role,is_active,created_at
     FROM users
     WHERE tenant_id=$1
     ORDER BY created_at DESC`,
    [tenantId]
  );

  res.json({ success: true, data: { users: users.rows, total: users.rowCount } });
};

exports.updateUser = async (req, res) => {
  const { fullName, role, isActive } = req.body;
  const userId = req.params.userId;

  const user = await db.query(
    'SELECT * FROM users WHERE id=$1',
    [userId]
  );
  if (!user.rowCount) return res.status(404).json({ success: false });

  if (req.user.role !== 'tenant_admin' && req.user.userId !== userId) {
    return res.status(403).json({ success: false });
  }

  const updated = await db.query(
    `UPDATE users SET
      full_name = COALESCE($1, full_name),
      role = COALESCE($2, role),
      is_active = COALESCE($3, is_active),
      updated_at = CURRENT_TIMESTAMP
     WHERE id=$4
     RETURNING id,full_name,role,updated_at`,
    [fullName, role, isActive, userId]
  );

  res.json({ success: true, data: updated.rows[0] });
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  if (userId === req.user.userId) {
    return res.status(403).json({ success: false, message: 'Cannot delete self' });
  }

  await db.query('DELETE FROM users WHERE id=$1', [userId]);
  res.json({ success: true, message: 'User deleted successfully' });
};
