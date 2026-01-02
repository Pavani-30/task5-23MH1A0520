const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Register Tenant
 */
const registerTenant = async (req, res) => {
  return res.status(201).json({
    message: 'Tenant registered successfully'
  });
};

/**
 * Login
 */
const login = async (req, res) => {
  return res.status(200).json({
    message: 'Login successful'
  });
};

/**
 * Get current user
 */
const me = async (req, res) => {
  return res.status(200).json({
    message: 'User profile fetched'
  });
};

/**
 * Logout
 */
const logout = async (req, res) => {
  return res.status(200).json({
    message: 'Logout successful'
  });
};

/**
 * EXPORTS (THIS IS THE MOST IMPORTANT PART)
 */
module.exports = {
  registerTenant,
  login,
  me,
  logout
};
