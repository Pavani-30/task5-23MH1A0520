import api from './api';

export default {
  list: tenantId => api.get(`/tenants/${tenantId}/users`),
  add: (tenantId, data) => api.post(`/tenants/${tenantId}/users`, data),
  update: (id, data) => api.put(`/users/${id}`, data),
  remove: id => api.delete(`/users/${id}`)
};
