const db = require('../config/db');
const { logAudit } = require('../services/audit.service');

exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  const count = await db.query(
    'SELECT COUNT(*) FROM projects WHERE tenant_id=$1',
    [req.user.tenantId]
  );

  const tenant = await db.query(
    'SELECT max_projects FROM tenants WHERE id=$1',
    [req.user.tenantId]
  );

  if (parseInt(count.rows[0].count) >= tenant.rows[0].max_projects) {
    return res.status(403).json({ success: false, message: 'Project limit reached' });
  }

  const project = await db.query(
    `INSERT INTO projects (tenant_id,name,description,created_by)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [req.user.tenantId, name, description, req.user.userId]
  );

  await logAudit({
    tenantId: req.user.tenantId,
    userId: req.user.userId,
    action: 'CREATE_PROJECT',
    entityType: 'project',
    entityId: project.rows[0].id,
    ip: req.ip
  });

  res.status(201).json({ success: true, data: project.rows[0] });
};

exports.listProjects = async (req, res) => {
  const projects = await db.query(
    `SELECT p.*, u.full_name AS created_by_name
     FROM projects p
     JOIN users u ON u.id=p.created_by
     WHERE p.tenant_id=$1
     ORDER BY p.created_at DESC`,
    [req.user.tenantId]
  );

  res.json({ success: true, data: projects.rows });
};

exports.updateProject = async (req, res) => {
  const { name, description, status } = req.body;
  const projectId = req.params.projectId;

  const updated = await db.query(
    `UPDATE projects SET
      name=COALESCE($1,name),
      description=COALESCE($2,description),
      status=COALESCE($3,status),
      updated_at=CURRENT_TIMESTAMP
     WHERE id=$4 AND tenant_id=$5
     RETURNING *`,
    [name, description, status, projectId, req.user.tenantId]
  );

  if (!updated.rowCount) return res.status(404).json({ success: false });

  res.json({ success: true, data: updated.rows[0] });
};

exports.deleteProject = async (req, res) => {
  await db.query(
    'DELETE FROM projects WHERE id=$1 AND tenant_id=$2',
    [req.params.projectId, req.user.tenantId]
  );
  res.json({ success: true, message: 'Project deleted successfully' });
};
