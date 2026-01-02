import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(form);
      localStorage.setItem('token', res.data.data.token);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <input placeholder="Tenant Subdomain" onChange={e => setForm({...form, tenantSubdomain: e.target.value})} />

      <button>Login</button>
      {error && <p style={{color:'red'}}>{error}</p>}
      <Link to="/register">Create new account</Link>
    </form>
  );
}
