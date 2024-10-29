import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsList from './components/projectsList';
import NewProjectForm from './components/projectForm';
import UpdateProjectForm from './components/updateProjectForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProjectsList />} />
        <Route path='/project' element={<NewProjectForm />} />
        <Route path='/project/:id' element={<UpdateProjectForm />} />
      </Routes>
    </Router>
  );
};

export default App;
