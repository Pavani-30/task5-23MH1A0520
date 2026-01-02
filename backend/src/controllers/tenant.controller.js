const db = require('../config/db');
const { logAudit } = require('../services/audit.service');

/**
 * API 5: Get Tenant Details
 * GET /api/tenants/:tenantId
 */
exports.getTenantDetails = async (req, res) => {
  try {
    const { tenantId } = req.params;

    // Only super_admin or same-tenant users can access
    if (req.user.role !== 'super_admin' && req.user.tenantId !== tenantId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to tenant'
      });
    }

    const tenantResult = await db.query(
      `SELECT id, name, subdomain, status, subscription_plan,
              max_users, max_projects, created_at
       FROM tenants
       WHERE id = $1`,
      [tenantId]
    );

    if (tenantResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }

    const statsResult = await db.query(
      `
      SELECT
        (SELECT COUNT(*) FROM users WHERE tenant_id = $1) AS total_users,
        (SELECT COUNT(*) FROM projects WHERE tenant_id = $1) AS total_projects,
        (SELECT COUNT(*) FROM tasks WHERE tenant_id = $1) AS total_tasks
      `,
      [tenantId]
    );

    const tenant = tenantResult.rows[0];
    const stats = statsResult.rows[0];

    return res.status(200).json({
      success: true,
      data: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        status: tenant.status,
        subscriptionPlan: tenant.subscription_plan,
        maxUsers: tenant.max_users,
        maxProjects: tenant.max_projects,
        createdAt: tenant.created_at,
        stats: {
          totalUsers: Number(stats.total_users),
          totalProjects: Number(stats.total_projects),
          totalTasks: Number(stats.total_tasks)
        }
      }
    });
  } catch (error) {
    console.error('Get Tenant Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * API 6: Update Tenant
 * PUT /api/tenants/:tenantId
 */
exports.updateTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { name, status, subscriptionPlan, maxUsers, maxProjects } = req.body;

    // Tenant admin restrictions
    if (req.user.role === 'tenant_admin') {
      if (
        status !== undefined ||
        subscriptionPlan !== undefined ||
        maxUsers !== undefined ||
        maxProjects !== undefined
      ) {
        return res.status(403).json({
          success: false,
          message: 'Tenant admin cannot update subscription or status'
        });
      }
    }

    // Authorization check
    if (req.user.role !== 'super_admin' && req.user.tenantId !== tenantId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const updateResult = await db.query(
      `
      UPDATE tenants SET
        name = COALESCE($1, name),
        status = COALESCE($2, status),
        subscription_plan = COALESCE($3, subscription_plan),
        max_users = COALESCE($4, max_users),
        max_projects = COALESCE($5, max_projects),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING id, name, updated_at
      `,
      [
        name || null,
        status || null,
        subscriptionPlan || null,
        maxUsers || null,
        maxProjects || null,
        tenantId
      ]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }

    await logAudit({
      tenantId,
      userId: req.user.userId,
      action: 'UPDATE_TENANT',
      entityType: 'tenant',
      entityId: tenantId,
      ip: req.ip
    });

    return res.status(200).json({
      success: true,
      message: 'Tenant updated successfully',
      data: updateResult.rows[0]
    });
  } catch (error) {
    console.error('Update Tenant Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * API 7: List All Tenants
 * GET /api/tenants
 * Super Admin Only
 */
exports.listTenants = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admin can access this resource'
      });
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const offset = (page - 1) * limit;

    const filters = [];
    const values = [];

    if (req.query.status) {
      values.push(req.query.status);
      filters.push(`t.status = $${values.length}`);
    }

    if (req.query.subscriptionPlan) {
      values.push(req.query.subscriptionPlan);
      filters.push(`t.subscription_plan = $${values.length}`);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const tenantsResult = await db.query(
      `
      SELECT
        t.id,
        t.name,
        t.subdomain,
        t.status,
        t.subscription_plan,
        t.created_at,
        (SELECT COUNT(*) FROM users u WHERE u.tenant_id = t.id) AS total_users,
        (SELECT COUNT(*) FROM projects p WHERE p.tenant_id = t.id) AS total_projects
      FROM tenants t
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
      `,
      [...values, limit, offset]
    );

    const countResult = await db.query(
      `SELECT COUNT(*) FROM tenants t ${whereClause}`,
      values
    );

    return res.status(200).json({
      success: true,
      data: {
        tenants: tenantsResult.rows.map(t => ({
          id: t.id,
          name: t.name,
          subdomain: t.subdomain,
          status: t.status,
          subscriptionPlan: t.subscription_plan,
          totalUsers: Number(t.total_users),
          totalProjects: Number(t.total_projects),
          createdAt: t.created_at
        })),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(Number(countResult.rows[0].count) / limit),
          totalTenants: Number(countResult.rows[0].count),
          limit
        }
      }
    });
  } catch (error) {
    console.error('List Tenants Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
