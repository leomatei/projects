import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchProjects, seedProjects } from '../../services/projectServices';

import PlusSVG from './../../assets/plus.svg?react';
import ProjectList from '../../components/projectsList';
import { ModalProvider } from '../../customHooks/modalContext';

import './styles.scss';

const HomePage = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const handleSeedProjects = async () => {
    try {
      await seedProjects().then(() => {
        queryClient.invalidateQueries(['projects']);
      });
    } catch (error) {
      console.error('Error seeding projects:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ModalProvider>
      <div className='home-page'>
        <h1 className='home-page__title'>Portfolio Website</h1>
        <p className='home-page__description'>
          <span>
            You can store your project on this website. Provide links and
            images.{' '}
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
          <button className='custom-button' onClick={handleSeedProjects}>
            Add 10 more dummy projects
          </button>
        </div>
        <ProjectList data={data} />
      </div>
    </ModalProvider>
  );
};

export default HomePage;
