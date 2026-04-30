import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import PostJobPage from './pages/PostJobPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserDashboard from './Dashboard/UserDashboard';
import EmployerDashboard from './Dashboard/EmployerDashboard';
import JobDetailsPage from './pages/JobDetailsPage';
import BrowseJobsPage from './pages/BrowseJobsPage';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from './store/Slice/UserSlice';
import { fetchJob } from './store/Slice/JobSlice';
import { useEffect } from 'react';
import ProtectedRoute from './pages/ProtectedRoute';
import About from './pages/About';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
    dispatch(fetchJob())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path="post-job" element={<ProtectedRoute><PostJobPage /></ProtectedRoute>} />
          <Route path='login' element={<SignInPage />} />
          <Route path='sign' element={<SignUpPage></SignUpPage>} />
          <Route path='forgot' element={<ForgotPasswordPage></ForgotPasswordPage>} />
          <Route path='user_dashboard' element={<ProtectedRoute><UserDashboard></UserDashboard></ProtectedRoute>} />
          <Route path='employer_dashboard' element={<ProtectedRoute><EmployerDashboard></EmployerDashboard></ProtectedRoute>} />
          <Route path='JobDetailsPage/:jobId' element={<JobDetailsPage></JobDetailsPage>} />
          <Route path='jobs' element={<BrowseJobsPage></BrowseJobsPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
