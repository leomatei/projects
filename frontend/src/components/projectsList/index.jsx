import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchProjects = async () => {
  const response = await axios.get('http://localhost:3000/api/projects');
  return response.data;
};

const ProjectsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleEdit = (project) => {
    navigate('/project', { state: { project } }); // Pass the selected project to the form
  };

  return (
    <ul>
      {data.map((project) => (
        <li key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <a href={project.link} target='_blank' rel='noopener noreferrer'>
            View Project
          </a>
          <button onClick={() => handleEdit(project)}>Edit Project</button>{' '}
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
