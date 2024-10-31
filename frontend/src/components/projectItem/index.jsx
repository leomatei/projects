import React from 'react';
import EditSVG from './../../assets/edit.svg?react';
import ClickSVG from './../../assets/click.svg?react';
import DeleteSVG from './../../assets/delete.svg?react';
import './styles.scss';

const ProjectItem = ({ project, onDelete }) => {
  return (
    <li className='project-item'>
      <h2 className='project-item__title'>{project.title}</h2>
      <p className='project-item__description'>{project.description}</p>
      <a
        href={project.link}
        target='_blank'
        rel='noopener noreferrer'
        className='project-item__link'
      >
        <ClickSVG width='20px' height='20px' />
        View Project
      </a>
      {project.images.length > 0 &&
        project.images.map((item) => (
          <img
            key={item.id}
            src={item.image_data}
            alt={`Project ${project.id}`}
            className='project-item__image'
          />
        ))}
      <div className='project-item__actions'>
        <a
          href={`/project/${project.id}`}
          className='project-item__actions__edit'
        >
          <EditSVG width='20px' height='20px' />
          Edit Project
        </a>
        <button
          onClick={() => onDelete(project)}
          className='project-item__actions__delete'
        >
          <DeleteSVG width='20px' height='20px' />
          Delete Project
        </button>
      </div>
    </li>
  );
};

export default ProjectItem;
