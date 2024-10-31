import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useImageUploader } from '../../customHooks/useImageUploader';

import './styles.scss';

const ProjectForm = ({
  onSubmit,
  initialData = { title: '', description: '', link: '', images: [] },
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const {
    imageData,
    setImageData,
    removeImage,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useImageUploader();
  console.log(initialData);

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('description', initialData.description);
      setValue('link', initialData.link);
      setImageData(initialData.images);
    }
  }, []);

  const handleFormSubmit = async (data) => {
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Title</label>
        <input type='text' {...register('title', { required: true })} />
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} />
      </div>
      <div>
        <label>Link</label>
        <input type='url' {...register('link')} />
      </div>
      <div>
        <label>Images</label>
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
                className='delete-button'
                type='button'
                onClick={() => removeImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type='submit'>
        {initialData ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
