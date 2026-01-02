const router = require('express').Router();
const db = require('../config/db');

router.get('/health', async (req, res) => {
  try {
    // DB connectivity
    await db.query('SELECT 1');

    // Verify seed data exists
    const superAdmin = await db.query(
      "SELECT id FROM users WHERE role='super_admin' LIMIT 1"
    );

    if (superAdmin.rowCount === 0) {
      return res.status(503).json({
        status: 'initializing',
        database: 'connected'
      });
    }

    res.status(200).json({
      status: 'ok',
      database: 'connected'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected'
    });
  }
});

module.exports = router;
