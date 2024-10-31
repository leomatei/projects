import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import DeleteProjectModal from '../../components/deleteProjectModal';
import { useModal } from '../../customHooks/modalContext';

import { fetchProjects, deleteProject } from '../../services/projectServices';

import PlusSVG from './../../assets/plus.svg?react';

import './styles.scss';

const ProjectsList = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const { isModalOpen, modalData, openModal, closeModal } = useModal();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

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
      <h1 className='home-page__title'>Portfolio Website</h1>
      <p className='home-page__description'>
        <span>
          You can store your project on this website. Provide links and images.{' '}
        </span>
        <br />
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          dolores obcaecati, repellendus rerum, animi vitae nesciunt tempore
          velit beatae reiciendis eum. Nostrum excepturi officia maiores nam
          enim consectetur tenetur tempore!
        </span>
      </p>
      <div className='home-page__buttons-wrapper'>
        <a className='custom-button' href='/project'>
          {/* <img src={PlusSVG} /> */}
          <PlusSVG />
          Add Project
        </a>
        <button className='custom-button'>Add 10 more dummy projects</button>
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
            <a href={`/project/${project.id}`}>Edit Project</a>
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
