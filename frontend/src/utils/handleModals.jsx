import React from 'react';
import ImageSliderModal from '../components/imageSliderModal';
import { useDispatch } from 'react-redux';
import { useModal } from '../customHooks/modalContext';
import { deleteProject } from '../services/projectServices';
import { deleteProject as deleteProjectSlice } from '../store/projectsSlice';

const HandleOpenModal = () => {
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();
  const handleDelete = (project) => {
    openModal({
      title: 'Are you sure you want to delete this project?',
      content: (
        <>
          <div className='delete-modal__text'>
            <p>{project.title}</p>
            <p>{project.description}</p>
          </div>
          <button
            className='modal-button delete-button'
            onClick={async () => {
              try {
                await deleteProject(project.id);
                dispatch(deleteProjectSlice(project.id));

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
  const handleClickImage = (project, imageIndex) => {
    openModal({
      title: `Images for ${project.title}`,
      content: (
        <ImageSliderModal images={project.images} initialSlide={imageIndex} />
      ),
      onCancel: closeModal,
    });
  };
  return { handleDelete, handleClickImage };
};

export default HandleOpenModal;
