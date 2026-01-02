const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const controller = require('../controllers/tenant.controller');

/**
 * API 5: Get Tenant Details
 */
router.get('/:tenantId', auth, controller.getTenantDetails);

/**
 * API 6: Update Tenant
 */
router.put('/:tenantId', auth, controller.updateTenant);

/**
 * API 7: List All Tenants (Super Admin Only)
 */
router.get('/', auth, role('super_admin'), controller.listTenants);

module.exports = router;
