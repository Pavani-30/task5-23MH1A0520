import { useState } from 'react';
import api from '../services/api';

export default function TaskModal({ projectId, task, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || ''
  });

  const submit = async () => {
    if (!form.title) return alert('Task title required');

    if (task) {
      await api.put(`/tasks/${task.id}`, form);
    } else {
      await api.post(`/projects/${projectId}/tasks`, form);
    }
    onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <h3>{task ? 'Edit Task' : 'Add Task'}</h3>

      <input
        placeholder="Task Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.priority}
        onChange={e => setForm({ ...form, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={form.dueDate}
        onChange={e => setForm({ ...form, dueDate: e.target.value })}
      />

      <button onClick={submit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
