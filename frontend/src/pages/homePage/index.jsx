import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Modal from '../../components/modal';
import { useModal } from '../../customHooks/modalContext';

import { fetchProjects, deleteProject } from '../../services/projectServices';

import PlusSVG from './../../assets/plus.svg?react';
import ProjectList from '../../components/projectsList';

import './styles.scss';

const HomePage = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const { isModalOpen, modalData, openModal, closeModal } = useModal();

  const handleDelete = (project) => {
    openModal({
      title: 'Are you sure you want to delete this project?',
      content: (
        <>
          <p>{project.title}</p>
          <button
            onClick={async () => {
              try {
                await deleteProject(project.id);
                queryClient.invalidateQueries(['projects']);
                closeModal();
              } catch (error) {
                console.error('Failed to delete project', error);
              }
            }}
          >
            Confirm
          </button>
        </>
      ),
      onCancel: closeModal,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className='home-page'>
      {isModalOpen && (
        <Modal title={modalData.title} onCancel={modalData.onCancel}>
          {modalData.content}
        </Modal>
      )}
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
          <PlusSVG />
          Add Project
        </a>
        <button className='custom-button'>Add 10 more dummy projects</button>
      </div>
      <ProjectList data={data} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
