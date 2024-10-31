import React from 'react';
import ProjectItem from '../projectItem';

import './styles.scss';

const ProjectList = ({ data, onDelete }) => {
  return (
    <ul className='project-list'>
      {data.map((project) => (
        <ProjectItem key={project.id} project={project} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ProjectList;
