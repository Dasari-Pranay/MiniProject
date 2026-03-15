import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Auth from './pages/Auth.jsx'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice.js';
import InterviewPage from './pages/InterviewPage.jsx';
import InterviewHistory from './pages/InterviewHistory.jsx';
import InterviewReport from './pages/InterviewReport.jsx';
import Pricing from './pages/Pricing.jsx';

export const ServerUrl = "https://miniproject-1-s30b.onrender.com";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
  const getUser = async () => {
    try {

      const result = await axios.get(
        `${ServerUrl}/api/user/current-user`,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));

    } catch (error) {

      console.log(error);
      dispatch(setUserData(null));

    }
  };

  getUser();

}, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path ='/interview' element={<InterviewPage />} />
        <Route path ='/history' element={<InterviewHistory />} />
        <Route path ='/pricing' element={<Pricing />} />
        <Route path ='/report/:id' element={<InterviewReport />} />

      </Routes>
    </div>
  )
}

export default App
