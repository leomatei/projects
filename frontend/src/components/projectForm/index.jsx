import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const NewProjectForm = () => {
  const { state } = useLocation(); // Get the state passed from the ProjectsList
  const project = state?.project;
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();

  // Populate form fields when the project prop changes
  useEffect(() => {
    if (project) {
      setValue('title', project.title);
      setValue('description', project.description);
      setValue('link', project.link);
      setImageData(project.images); // Set existing images if needed
    }
  }, [project, setValue]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    });

    Promise.all(promises)
      .then((base64Images) => setImageData(base64Images))
      .catch((error) => console.error('Error converting images: ', error));
  };

  const onSubmit = async (data) => {
    try {
      const projectData = {
        title: data.title,
        description: data.description,
        link: data.link,
        images: imageData, // Send the Base64-encoded images
      };

      if (project) {
        // Update existing project
        await axios.put(
          `http://localhost:3000/api/projects/${project.id}`,
          projectData
        );
      } else {
        // Create new project
        await axios.post('http://localhost:3000/api/projects', projectData);
      }

      navigate('/'); // Redirect to the projects list
      reset(); // Clear the form
      setImageData([]); // Clear image data
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
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button type='submit'>
        {project ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default NewProjectForm;
