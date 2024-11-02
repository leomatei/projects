import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    page: 1,
    total: 0,
  },
  reducers: {
    setProjects(state, action) {
      state.items = action.payload;
    },
    addProjects(state, action) {
      state.items = [...state.items, ...action.payload];
    },
    incrementPage(state) {
      state.page += 1;
    },
    resetProjects(state) {
      state.items = [];
      state.page = 1;
    },
    setTotalProjects(state, action) {
      state.total = action.payload;
    },
    deleteProject(state, action) {
      state.items = state.items.filter(
        (project) => project.id !== action.payload
      );
    },
  },
});

export const {
  setProjects,
  addProjects,
  incrementPage,
  resetProjects,
  setTotalProjects,
  deleteProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
