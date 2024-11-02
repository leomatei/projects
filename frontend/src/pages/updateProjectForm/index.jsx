import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProjectData,
  updateProject,
} from '../../services/projectServices';
import ProjectForm from '../../components/projectForm';
import {
  setLoading,
  setSuccessMessage,
  setErrorMessage,
} from '../../store/generalSlice';

const UpdateProjectForm = () => {
  const { loading } = useSelector((state) => state.general);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [project, setProject] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        await fetchProjectData(params.id)
          .then((res) => setProject(res))
          .finally(() => dispatch(setLoading(false)));
      } catch (err) {
        dispatch(setLoading(false));
        console.error(err);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (projectData) => {
    try {
      dispatch(setLoading(true));
      await updateProject(params.id, projectData)
        .then(() => navigate('/'))
        .finally(() => dispatch(setLoading(false)));
      dispatch(setSuccessMessage('Project updated successfuly!'));
    } catch (error) {
      dispatch(setLoading(false));
      console.error('Failed to update project:', error);
      dispatch(setErrorMessage('Error while updating the project!'));
    }
  };

  return (
    <>
      {!loading && (
        <ProjectForm
          onSubmit={handleSubmit}
          initialData={project}
          isUpdateForm
        />
      )}
    </>
  );
};

export default UpdateProjectForm;
