const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/register-tenant', controller.registerTenant);
router.post('/login', controller.login);
router.get('/me', require('../middleware/auth.middleware'), controller.me);
router.post('/logout', require('../middleware/auth.middleware'), controller.logout);

module.exports = router;
