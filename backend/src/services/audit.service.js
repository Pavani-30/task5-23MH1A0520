const db = require('../config/db');

async function logAudit({ tenantId, userId, action, entityType, entityId, ip }) {
  await db.query(
    `INSERT INTO audit_logs (tenant_id, user_id, action, entity_type, entity_id, ip_address)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [tenantId, userId, action, entityType, entityId, ip]
  );
}

module.exports = { logAudit };
