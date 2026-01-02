import { useEffect, useState } from 'react';
import authService from '../services/authService';
import projectService from '../services/projectService';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    authService.me().then(res => setUser(res.data.data));
    projectService.list().then(res => setProjects(res.data.data));
  }, []);

  return (
    <>
      <Navbar user={user} />
      <h2>Dashboard</h2>
      <p>Total Projects: {projects.length}</p>
    </>
  );
}
