import React from 'react';
import Slider from 'react-slick';
import EditSVG from './../../assets/edit.svg?react';
import ClickSVG from './../../assets/click.svg?react';
import DeleteSVG from './../../assets/delete.svg?react';
import ImageSliderModal from '../imageSliderModal';
import { useModal } from '../../customHooks/modalContext';
import './styles.scss';

const ProjectItem = ({ project, onDelete }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const { openModal, closeModal } = useModal();
  const handleClickImage = () => {
    openModal({
      title: `Images for ${project.title}`,
      content: <ImageSliderModal images={project.images} />,
      onCancel: closeModal,
    });
  };
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
      {project.images.length > 0 && (
        <Slider {...sliderSettings} className='project-item__slider'>
          {project.images.map((item) => (
            <div
              key={item.id}
              className='project-item__slider__image-container'
            >
              <img
                src={item.image_data}
                alt={`Image ${item.id} of Project ${project.id}`}
                className='project-item__slider__image-container__image'
                onClick={handleClickImage}
              />
            </div>
          ))}
        </Slider>
      )}
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
