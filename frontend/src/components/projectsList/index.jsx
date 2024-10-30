import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const fetchProjects = async () => {
  const response = await axios.get('http://localhost:3000/api/projects');
  return response.data;
};

const ProjectsList = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleEdit = (project) => {
    navigate(`/project/${project.id}`);
  };
  const handleDelete = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/projects/${selectedProject.id}`
      );

      queryClient.invalidateQueries(['projects']);
      setIsModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };
  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className='home-page'>
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Are you sure you want to delete this project?</h3>
            <p>{selectedProject?.title}</p>
            <button onClick={confirmDelete}>Confirm</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
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
            <button onClick={() => handleDelete(project)}>
              Delete Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
