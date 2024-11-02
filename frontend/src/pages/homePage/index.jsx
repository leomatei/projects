import React from 'react';
import { useDispatch } from 'react-redux';
import PlusSVG from './../../assets/plus.svg?react';
import ProjectList from '../../components/projectsList';
import { ModalProvider } from '../../customHooks/modalContext';
import { seedProjects } from '../../services/projectServices';
import { setProjects, setTotalProjects } from '../../store/projectsSlice';

import './styles.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const handleSeedProjects = async () => {
    try {
      await seedProjects().then((res) => {
        console.log(res);
        dispatch(setProjects(res.data.projects));
        dispatch(setTotalProjects(res.data.total));
      });
    } catch (error) {
      console.error('Error seeding projects:', error);
    }
  };

  return (
    <ModalProvider>
      <div className='home-page'>
        <h1 className='home-page__title'>Portfolio Website</h1>
        <p className='home-page__description'>
          <span>
            You can store your projects on this website. Provide links and
            images.
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
        <ProjectList />
      </div>
    </ModalProvider>
  );
};

export default HomePage;
