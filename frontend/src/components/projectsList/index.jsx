import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

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
    navigate(`/project/${project.id}`);
  };
  const handleDelete = (prpject) => {};

  return (
    <div className='home-page'>
      <div className='modal-overlay'>
        <div className='modal'>modal</div>
      </div>
      <ul>
        {data.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target='_blank' rel='noopener noreferrer'>
              View Project
            </a>
            {!!project.images.length &&
              project.images.map((item) => (
                <img
                  key={`image_id${item.id}, project id${project.id}`}
                  src={item.image_data}
                  alt={`image id:${item.id} from project id:${project.id}`}
                ></img>
              ))}
            <button onClick={() => handleEdit(project)}>Edit Project</button>
            <button onClick={() => console.log('deleted')}>
              Delete Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
