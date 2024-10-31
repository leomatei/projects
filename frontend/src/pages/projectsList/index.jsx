import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import DeleteProjectModal from '../../components/deleteProjectModal';
import { useModal } from '../../customHooks/modalContext';

import { fetchProjects, deleteProject } from '../../services/projectServices';

import './styles.scss';

const ProjectsList = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
  const navigate = useNavigate();

  const { isModalOpen, modalData, openModal, closeModal } = useModal();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleEdit = (project) => {
    navigate(`/project/${project.id}`);
  };
  const handleDelete = (project) => {
    openModal({
      content: project.title,
      onConfirm: async () => {
        try {
          await deleteProject(project.id);
          queryClient.invalidateQueries(['projects']);
          closeModal();
        } catch (error) {
          console.error('Failed to delete project', error);
        }
      },
      onCancel: closeModal,
    });
  };

  return (
    <div className='home-page'>
      {isModalOpen && <DeleteProjectModal {...modalData} />}
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
