import React, { useState, useEffect } from 'react';
import { fetchProjects, updateStatus } from '../../services/projectServices';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [page, setPage] = useState(1);

  const getProjects = async () => {
    try {
      const { data, total } = await fetchProjects(page, 10, true);
      setProjects(data);
      setTotalProjects(total);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleStatusToggle = async (projectId, currentStatus) => {
    try {
      await updateStatus(projectId, !currentStatus);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, status: !currentStatus }
            : project
        )
      );
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [page]);

  return (
    <div>
      <h2>All Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.title}</td>
              <td>{project.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  onClick={() => handleStatusToggle(project.id, project.status)}
                >
                  {project.status ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={page * 10 >= totalProjects}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
