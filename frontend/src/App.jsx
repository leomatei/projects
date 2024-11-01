import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import NewProjectForm from './pages/newProjectForm';
import UpdateProjectForm from './pages/updateProjectForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/project' element={<NewProjectForm />} />
        <Route path='/project/:id' element={<UpdateProjectForm />} />
      </Routes>
    </Router>
  );
};

export default App;
