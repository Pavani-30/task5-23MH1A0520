import { useEffect, useState } from 'react';
import projectService from '../services/projectService';
import Navbar from '../components/Navbar';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectService.list().then(res => setProjects(res.data.data));
  }, []);

  return (
    <>
      <Navbar />
      <h2>Projects</h2>
      {projects.map(p => (
        <div key={p.id}>
          <b>{p.name}</b> - {p.status}
        </div>
      ))}
    </>
  );
}
