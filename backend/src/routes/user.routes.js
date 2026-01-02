const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const controller = require('../controllers/user.controller');

router.post('/:tenantId/users', auth, role('tenant_admin'), controller.addUser);
router.get('/:tenantId/users', auth, controller.listUsers);
router.put('/users/:userId', auth, controller.updateUser);
router.delete('/users/:userId', auth, role('tenant_admin'), controller.deleteUser);

module.exports = router;
