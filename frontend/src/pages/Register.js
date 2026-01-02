import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.terms) return setError('Accept terms & conditions');
    if (form.password !== form.confirmPassword)
      return setError('Passwords do not match');

    try {
      setLoading(true);
      await authService.registerTenant({
        tenantName: form.tenantName,
        subdomain: form.subdomain,
        adminEmail: form.adminEmail,
        adminPassword: form.password,
        adminFullName: form.adminFullName
      });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register Organization</h2>

      <input placeholder="Organization Name" onChange={e => setForm({...form, tenantName: e.target.value})} />
      <input placeholder="Subdomain" onChange={e => setForm({...form, subdomain: e.target.value})} />
      <small>{form.subdomain}.yourapp.com</small>

      <input type="email" placeholder="Admin Email" onChange={e => setForm({...form, adminEmail: e.target.value})} />
      <input placeholder="Admin Full Name" onChange={e => setForm({...form, adminFullName: e.target.value})} />

      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <input type="password" placeholder="Confirm Password" onChange={e => setForm({...form, confirmPassword: e.target.value})} />

      <label>
        <input type="checkbox" onChange={e => setForm({...form, terms: e.target.checked})} />
        Accept Terms & Conditions
      </label>

      <button disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      {error && <p style={{color:'red'}}>{error}</p>}
      <Link to="/login">Already have an account?</Link>
    </form>
  );
}
