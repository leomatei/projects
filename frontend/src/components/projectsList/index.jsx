import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectItem from '../projectItem';
import Modal from '../modal';
import { useModal } from '../../customHooks/modalContext';
import { fetchProjects } from '../../services/projectServices';
import {
  addProjects,
  incrementPage,
  setTotalProjects,
} from '../../store/projectsSlice';

import './styles.scss';

const ProjectList = () => {
  const dispatch = useDispatch();
  const {
    items: projects,
    page,
    total,
  } = useSelector((state) => state.projects);
  const limit = 10;
  const { isModalOpen, modalData } = useModal();

  const loadProjects = async () => {
    try {
      const response = await fetchProjects(page, limit);
      dispatch(addProjects(response.data));
      dispatch(setTotalProjects(response.total));
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  useEffect(() => {
    loadProjects();
  }, [page]);
  useEffect(() => {
    return () => {
      dispatch(resetProjects());
    };
  }, [dispatch]);

  return (
    <>
      {isModalOpen && (
        <Modal title={modalData.title} onCancel={modalData.onCancel}>
          {modalData.content}
        </Modal>
      )}
      <ul className='project-list'>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
      {total !== projects.length && (
        <button className='custom-button' onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </>
  );
};

export default ProjectList;
