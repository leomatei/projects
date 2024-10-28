// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsList from './components/projectsList';
import NewProjectForm from './components/projectForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProjectsList />} />
        <Route path='/project' element={<NewProjectForm />} />
      </Routes>
    </Router>
  );
};

export default App;
