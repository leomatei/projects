import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectServices';
import ProjectForm from './../../components/projectForm';

const NewProjectForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (projectData) => {
    try {
      await createProject(projectData);
      navigate('/');
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  return <ProjectForm onSubmit={handleSubmit} />;
};

export default NewProjectForm;
