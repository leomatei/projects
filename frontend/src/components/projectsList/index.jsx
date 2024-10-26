import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProjects = async () => {
  const response = await axios.get('http://localhost:3000/projects');
  return response.data;
};

const ProjectsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {data.map((project) => (
        <li key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <a href={project.link} target='_blank' rel='noopener noreferrer'>
            View Project
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
