import { useState } from 'react';
import userService from '../services/userService';

export default function UserModal({ tenantId, user, onClose, onSaved }) {
  const [form, setForm] = useState({
    email: user?.email || '',
    fullName: user?.fullName || '',
    password: '',
    role: user?.role || 'user',
    isActive: user?.isActive ?? true
  });

  const submit = async () => {
    if (!form.fullName) return alert('Name required');

    if (user) {
      await userService.update(user.id, form);
    } else {
      await userService.add(tenantId, form);
    }
    onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <h3>{user ? 'Edit User' : 'Add User'}</h3>

      {!user && (
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      )}

      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={e => setForm({ ...form, fullName: e.target.value })}
      />

      {!user && (
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      )}

      <select
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="tenant_admin">Tenant Admin</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={e => setForm({ ...form, isActive: e.target.checked })}
        />
        Active
      </label>

      <button onClick={submit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
