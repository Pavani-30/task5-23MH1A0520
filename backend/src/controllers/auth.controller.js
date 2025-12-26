const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

exports.registerTenant = async (req, res) => {
  const { tenantName, subdomain, adminEmail, adminPassword, adminFullName } = req.body;
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    const tenant = await client.query(
      `INSERT INTO tenants (name, subdomain)
       VALUES ($1,$2) RETURNING id`,
      [tenantName, subdomain]
    );

    const hash = await bcrypt.hash(adminPassword, 10);

    const user = await client.query(
      `INSERT INTO users (tenant_id,email,password_hash,full_name,role)
       VALUES ($1,$2,$3,$4,'tenant_admin')
       RETURNING id,email,full_name,role`,
      [tenant.rows[0].id, adminEmail, hash, adminFullName]
    );

    await client.query('COMMIT');
    res.status(201).json({ success: true, message: 'Tenant registered', data: {
      tenantId: tenant.rows[0].id,
      subdomain,
      adminUser: user.rows[0]
    }});
  } catch (e) {
    await client.query('ROLLBACK');
    res.status(409).json({ success: false, message: 'Subdomain or email exists' });
  } finally {
    client.release();
  }
};

exports.login = async (req, res) => {
  const { email, password, tenantSubdomain } = req.body;

  const tenant = await db.query(`SELECT * FROM tenants WHERE subdomain=$1`, [tenantSubdomain]);
  if (!tenant.rowCount) return res.status(404).json({ success:false, message:'Tenant not found' });

  const user = await db.query(
    `SELECT * FROM users WHERE email=$1 AND tenant_id=$2`,
    [email, tenant.rows[0].id]
  );
  if (!user.rowCount) return res.status(401).json({ success:false, message:'Invalid credentials' });

  const match = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!match) return res.status(401).json({ success:false, message:'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.rows[0].id, tenantId: tenant.rows[0].id, role: user.rows[0].role },
    secret,
    { expiresIn }
  );

  res.json({ success:true, data:{ user:{ id:user.rows[0].id, email, role:user.rows[0].role, tenantId:tenant.rows[0].id }, token, expiresIn:86400 }});
};

exports.me = async (req, res) => {
  const user = await db.query(
    `SELECT id,email,full_name,role,is_active FROM users WHERE id=$1`,
    [req.user.userId]
  );
  res.json({ success:true, data:user.rows[0] });
};

exports.logout = async (req, res) => {
  res.json({ success:true, message:'Logged out successfully' });
};
