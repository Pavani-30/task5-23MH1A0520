import api from './api';

const registerTenant = (data) =>
  api.post('/auth/register-tenant', data);

const login = (data) =>
  api.post('/auth/login', data);

const me = () =>
  api.get('/auth/me');

export default { registerTenant, login, me };
