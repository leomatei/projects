import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProjectData,
  updateProject,
} from '../../services/projectServices';
import ProjectForm from '../../components/projectForm';

const UpdateProjectForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectres = await fetchProjectData(params.id);

        setLoading(false);
        setProject(projectres);
      } catch (err) {
        console.error('An error has occurred', err);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (projectData) => {
    try {
      await updateProject(params.id, projectData);
      navigate('/');
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  return (
    !loading && <ProjectForm onSubmit={handleSubmit} initialData={project} />
  );
};

export default UpdateProjectForm;
