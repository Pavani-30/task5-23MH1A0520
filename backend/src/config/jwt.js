module.exports = {
  secret: process.env.JWT_SECRET || 'dev_secret',
  expiresIn: '24h'
};
