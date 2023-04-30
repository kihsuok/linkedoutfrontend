import './App.css'
// import Profile from './components/Profile';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Register from './components/user/Register';
import Login from './components/user/Login';
import AppliedJobs from './components/user/AppliedJobs';
import JobBoard from './components/user/JobBoard';
import AdminLogin from './components/admin/AdminLogin';
import AdminBoard from './components/admin/AdminBoard'
import JobApplicants from './components/admin/JobApplicants'
import JobDescription from './components/user/JobDescription';
import ApplicantProfile from './components/admin/ApplicantProfile'
import CreateJob from './components/admin/CreateJob'
import Profile from './components/user/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    
    <HashRouter>
      <Routes>
        <Route path="/linkedoutfrontend" element={<Login />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/job-board' element={<JobBoard />} />
        <Route path='/job-description/:id' element={<JobDescription />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-board' element={<AdminBoard />} />
        <Route path='/job-applicants/:id' element={<JobApplicants />} />
        <Route path='/applicant-profile/:email' element={<ApplicantProfile />} />
        <Route path='/create-job' element={<CreateJob/>}/>
        <Route path='/profile' element={<Profile/>}/>

      </Routes>
      <ToastContainer />
    </HashRouter>
  )
}

export default App
