import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import generalReducer from './generalSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    general: generalReducer,
  },
});

export default store;
