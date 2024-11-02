import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectServices';
import ProjectForm from './../../components/projectForm';
import {
  setLoading,
  setSuccessMessage,
  setErrorMessage,
} from '../../store/generalSlice';

const NewProjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (projectData) => {
    try {
      dispatch(setLoading(true));
      await createProject(projectData)
        .then(() => navigate('/'))
        .finally(() => dispatch(setLoading(false)));
      dispatch(setSuccessMessage('Project created successfuly!'));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      dispatch(setErrorMessage('Error while creating the project!'));
    }
  };

  return <ProjectForm onSubmit={handleSubmit} />;
};

export default NewProjectForm;
