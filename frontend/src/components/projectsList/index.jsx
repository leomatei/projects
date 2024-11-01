import React from 'react';
import ProjectItem from '../projectItem';
import Modal from '../modal';
import { useModal } from '../../customHooks/modalContext';

import './styles.scss';

const ProjectList = ({ data }) => {
  const { isModalOpen, modalData } = useModal();
  return (
    <>
      {isModalOpen && (
        <Modal title={modalData.title} onCancel={modalData.onCancel}>
          {modalData.content}
        </Modal>
      )}
      <ul className='project-list'>
        {data.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </>
  );
};

export default ProjectList;
