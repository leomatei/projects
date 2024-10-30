import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const fetchProjectData = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
  return response.data;
};

const UpdateProjectForm = () => {
  const params = useParams();

  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectData(params.id)
      .then((project) => {
        if (project) {
          setValue('title', project.title);
          setValue('description', project.description);
          setValue('link', project.link);
          setImageData(project.images || []);
        }
      })
      .catch((err) => console.error('An error has occured', err));
  }, [params.id, setValue]);

  const onDrop = useCallback((acceptedFiles) => {
    const imagePromises = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ image_data: reader.result });
        reader.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) =>
        setImageData((prevData) => [...prevData, ...base64Images])
      )
      .catch((error) => console.error('Error reading image files: ', error));
  }, []);

  const removeImage = (indexToRemove) => {
    setImageData((prevData) =>
      prevData.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const onSubmit = async (data) => {
    try {
      const projectData = {
        title: data.title,
        description: data.description,
        link: data.link,
        images: imageData,
      };

      await axios.put(
        `http://localhost:3000/api/projects/${params.id}`,
        projectData
      );

      navigate('/');
      reset();
      setImageData([]);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <div
          {...getRootProps()}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop images here, or click to select files</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {imageData.map((img, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                key={index}
                src={img.image_data}
                alt={`Uploaded Preview ${index}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <button
                type='button'
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type='submit'>Update Project</button>
    </form>
  );
};

export default UpdateProjectForm;
