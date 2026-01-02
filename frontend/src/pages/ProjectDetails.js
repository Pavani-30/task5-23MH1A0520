import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectService from '../services/projectService';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskModal from '../components/TaskModal';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const loadData = async () => {
    const projRes = await projectService.list();
    const proj = projRes.data.data.find(p => p.id === projectId);
    setProject(proj);

    const taskRes = await api.get(`/projects/${projectId}/tasks`);
    setTasks(taskRes.data.data);
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  if (!project) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <button onClick={() => setShowTaskModal(true)}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <b>{task.title}</b> – {task.status} – {task.priority}
          </li>
        ))}
      </ul>

      {showTaskModal && (
        <TaskModal
          projectId={projectId}
          onClose={() => setShowTaskModal(false)}
          onSaved={loadData}
        />
      )}
    </>
  );
}
