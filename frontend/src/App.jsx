import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/homePage';
import { toast } from 'react-toastify';
import NewProjectForm from './pages/newProjectForm';
import UpdateProjectForm from './pages/updateProjectForm';
import Spinner from './components/spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorMessage, setSuccessMessage } from './store/generalSlice';
import AdminPanel from './pages/adminPanel';

const App = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.general
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(setSuccessMessage(''));
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(setErrorMessage(''));
    }
  }, [errorMessage]);

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      {loading && <Spinner />}
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/project' element={<NewProjectForm />} />
          <Route path='/project/:id' element={<UpdateProjectForm />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
