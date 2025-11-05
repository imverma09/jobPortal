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
import { useEffect } from 'react';
function App() {
   const dispatch =   useDispatch()
   useEffect(()=>{
      dispatch(fetchUserInfo())
   }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<Home />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path='login' element={<SignInPage />}/>
          <Route path='sign' element={<SignUpPage></SignUpPage>}/>
          <Route path='forgot' element={<ForgotPasswordPage></ForgotPasswordPage>}/>
          <Route path='user_dashboard' element={<UserDashboard></UserDashboard>}/>
          <Route path='employer_dashboard' element={<EmployerDashboard></EmployerDashboard>}/>
          <Route path='JobDetailsPage' element={<JobDetailsPage></JobDetailsPage>}/>
          <Route path='jobs' element={<BrowseJobsPage></BrowseJobsPage>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
