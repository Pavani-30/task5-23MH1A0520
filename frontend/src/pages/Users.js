import { useEffect, useState } from 'react';
import userService from '../services/userService';
import authService from '../services/authService';
import Navbar from '../components/Navbar';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    authService.me().then(res => {
      setTenantId(res.data.data.tenant.id);
      return userService.list(res.data.data.tenant.id);
    }).then(res => setUsers(res.data.data.users));
  }, []);

  return (
    <>
      <Navbar />
      <h2>Users</h2>
      {users.map(u => (
        <div key={u.id}>{u.fullName} ({u.role})</div>
      ))}
    </>
  );
}
