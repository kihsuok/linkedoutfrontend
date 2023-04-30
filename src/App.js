import './App.css'
// import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
    
    <BrowserRouter>
      <Routes>
        <Route path="/linkedoutfrontend" element={<Login />}/>
        <Route path='/linkedoutfrontend/register' element={<Register />} />
        <Route path='/linkedoutfrontend/login' element={<Login />} />
        <Route path='/linkedoutfrontend/job-board' element={<JobBoard />} />
        <Route path='/linkedoutfrontend/job-description/:id' element={<JobDescription />} />
        <Route path='/linkedoutfrontend/applied-jobs' element={<AppliedJobs />} />
        <Route path='/linkedoutfrontend/admin-login' element={<AdminLogin />} />
        <Route path='/linkedoutfrontend/admin-board' element={<AdminBoard />} />
        <Route path='/linkedoutfrontend/job-applicants/:id' element={<JobApplicants />} />
        <Route path='/linkedoutfrontend/applicant-profile/:email' element={<ApplicantProfile />} />
        <Route path='/linkedoutfrontend/create-job' element={<CreateJob/>}/>
        <Route path='/linkedoutfrontend/profile' element={<Profile/>}/>

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
