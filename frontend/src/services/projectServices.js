import axios from 'axios';

const API_URL = 'http://localhost:3000/api/projects';

export const fetchProjects = async (page = 1, limit = 10, showAll = false) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}&showAll=${showAll}`
  );
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
export const updateStatus = async (id, status) => {
  await axios.patch(`${API_URL}/${id}`, { status });
};
export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
export const seedProjects = async () => {
  return await axios.get(`${API_URL}/seed`);
};
