import axios from 'axios';

const API_URL = 'http://localhost:3000/api/projects';

export const fetchProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProjectData = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  await axios.post(API_URL, projectData);
};

export const updateProject = async (id, projectData) => {
  await axios.put(`${API_URL}/${id}`, projectData);
};
export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
export const seedProjects = async () => {
  await axios.get(`${API_URL}/seed`);
};
