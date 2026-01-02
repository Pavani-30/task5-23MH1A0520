import { Link } from 'react-router-dom';

export default function Navbar({ user }) {
  return (
    <nav>
      <h3>MultiTenant SaaS</h3>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/projects">Projects</Link>

      {user?.role === 'tenant_admin' && <Link to="/users">Users</Link>}
      {user?.role === 'super_admin' && <Link to="/tenants">Tenants</Link>}

      <span>{user?.fullName} ({user?.role})</span>
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>Logout</button>
    </nav>
  );
}
