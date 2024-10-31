import React from 'react';
import ProjectItem from '../projectItem';

import './styles.scss';

const ProjectList = ({ data }) => {
  return (
    <ul className='project-list'>
      {data.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectList;
