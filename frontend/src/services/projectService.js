import api from './api';

export default {
  list: () => api.get('/projects'),
  create: data => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  remove: id => api.delete(`/projects/${id}`)
};
