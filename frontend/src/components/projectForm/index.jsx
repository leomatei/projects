import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BackSVG from '../../assets/back-arrow.svg?react';
import { useImageUploader } from '../../customHooks/useImageUploader';

import './styles.scss';

const ProjectForm = ({
  onSubmit,
  initialData = { title: '', description: '', link: '', images: [] },
  isUpdateForm = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const descriptionValue = watch('description') || '';
  const {
    imageData,
    setImageData,
    removeImage,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useImageUploader();
  const [totalFileSize, setTotalFileSize] = useState(0);
  const maxFileSizeMB = 10 * 1024 * 1024;

  useEffect(() => {
    if (isUpdateForm) {
      setValue('title', initialData.title);
      setValue('description', initialData.description);
      setValue('link', initialData.link);
      setImageData(initialData.images);
      const initialSize = initialData.images.reduce(
        (total, img) => total + img.size,
        0
      );
      setTotalFileSize(initialSize);
    }
  }, [initialData]);

  useEffect(() => {
    const size = imageData.reduce((total, img) => {
      console.log(img);
      return total + img.image_data.length;
    }, 0);
    setTotalFileSize(size);
  }, [imageData]);

  const handleFormSubmit = async (data) => {
    if (totalFileSize > maxFileSizeMB) {
      alert('Total file size should not exceed 10MB.');
      return;
    }
    const projectData = {
      title: data.title,
      description: data.description,
      link: data.link,
      images: imageData,
    };
    reset();
    setImageData([]);
    await onSubmit(projectData);
  };

  return (
    <>
      <a className='back-button' href='/'>
        <BackSVG />
        Back
      </a>
      <form className='project-form' onSubmit={handleSubmit(handleFormSubmit)}>
        <h1 className='project-form__title'>
          {initialData ? 'Update Project' : 'Create Project'}
        </h1>
        <div className='project-form__field'>
          <label className='project-form__field__label'>
            Title (100 characters max)
          </label>
          <input
            className='project-form__field__input'
            type='text'
            {...register('title', { required: true, maxLength: 100 })}
          />
          {errors.title?.type === 'maxLength' && (
            <p className='error-text'>Title cannot exceed 100 characters</p>
          )}
          {errors.title?.type === 'required' && (
            <p className='error-text'>Title is required</p>
          )}
        </div>
        <div className='project-form__field'>
          <label className='project-form__field__label'>Description</label>
          <textarea
            className='project-form__field__textarea'
            {...register('description', { maxLength: 1000 })}
          />
          <div className='character-count'>{descriptionValue.length}/1000</div>
          {errors.description?.type === 'maxLength' && (
            <p className='error-text'>
              Description cannot exceed 1000 characters
            </p>
          )}
        </div>
        <div className='project-form__field'>
          <label className='project-form__field__label'>Link</label>
          <input
            className='project-form__field__input'
            type='url'
            {...register('link', {
              required: 'Link is required',
              pattern: {
                value:
                  /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})?|localhost)(:\d{1,5})?(\/.*)*$/,
                message:
                  'Please enter a valid URL (e.g., google.com or http://google.com)',
              },
            })}
          />
          {errors.link && <p className='error-text'>{errors.link.message}</p>}
        </div>
        <div>
          <label>Images (max 10MBs in total)</label>
          <div className='image-uploader-wrapper' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop images here, or click to select files</p>
            )}
          </div>
          <div className='images-preview'>
            {imageData.map((img, index) => (
              <div key={index} className='image-wrapper'>
                <img
                  className='image'
                  src={img.image_data}
                  alt={`Uploaded Preview ${index}`}
                />
                <button
                  className='remove-button'
                  type='button'
                  onClick={() => removeImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <p className='file-size-info'>
            Total file size: {(totalFileSize / (1024 * 1024)).toFixed(2)} MB
          </p>
          {totalFileSize > maxFileSizeMB && (
            <p className='error-text'>Total file size cannot exceed 10MB</p>
          )}
        </div>
        <button type='submit'>
          {isUpdateForm ? 'Update Project' : 'Create Project'}
        </button>
      </form>
    </>
  );
};

export default ProjectForm;
