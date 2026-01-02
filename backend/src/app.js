const express = require('express');
const cors = require('cors');

const app = express();

/**
 * CORS CONFIGURATION
 * Local dev: http://localhost:3000
 * Docker: http://frontend:3000
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tenants', require('./routes/tenant.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api', require('./routes/health.routes'));
app.use('/api', require('./routes/task.routes'));

// Error handler
app.use(require('./middleware/error.middleware'));

module.exports = app;
