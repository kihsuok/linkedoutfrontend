import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import JobCard from './JobCard'
import jwt from 'jsonwebtoken'
import './cssfiles/jobboard.css'


function JobBoard () {
  const [email, setEmail] = useState('')

  const nav = useNavigate()

  useEffect(() => {
    const checkAuthorization = () => {
      console.log('AUTHENTICATING')
      const token = localStorage.getItem('token')
      if (token) {
        const user = jwt.decode(token)
        console.log('USER WHILE AUTHENTICATING : ', user)
        if (!user) {
          localStorage.removeItem('token')
          nav('/login')
        } else {
          setEmail(user.email)
        }
      } else nav('/login')
    }
    checkAuthorization()
  }, [nav])

  const [jobCards, setJobCards] = useState([])
  const [jobs, setJobs] = useState([])


  // useEffect(() => {
  //   async function fetchJobs () {
  //     const res = await axios.get('http://localhost:3000/user/jobs')
  //     const returnedjobs = res.data.jobs
  //     const newres = await axios.get('http://localhost:3000/admin/getorder')
  //     const order= newres.data.order;
  //     console.log(order);
  //     console.log("returned",returnedjobs);
  //     const sortedJobs = [];

  //     order.forEach((jobId) => {
  //       const job = returnedjobs.find((job) => job.id === jobId);
  //       if (job) {
  //         sortedJobs.push(job);
  //       }
  //     });
      
  //     setJobs(sortedJobs)

  //     const res2 = await axios.post("http://localhost:3000/user/applied-jobs", {email: email});
  //     const appliedJobIds = res2.data.appliedJobs.map(job => job.id);

  //     console.log("applied:" , appliedJobIds);
  //     console.log("jobs:", jobs);

  //     var b = new Set(appliedJobIds)
  //     var unappliedJobs = [...jobs].filter(x => ! b.has(x.id));

  //     // appliedJobs=jobs-appliedJobs
  //     setJobCards(
  //       unappliedJobs.map(job => (
  //         <JobCard
  //           id={job.id}
  //           title={job.title}
  //           location={job.location}
  //           deadline={job.deadline}
  //           contact={job.contact}
  //           email={email}
  //           archived={job.archived}
  //           hasApplied={false}
  //         />
  //       ))
  //     )


  //   setJobCards(
  //     unappliedJobs.map(job => (
  //       <JobCard
  //         id={job.id}
  //         title={job.title}
  //         location={job.location}
  //         deadline={job.deadline}
  //         contact={job.contact}
  //         email={email}
  //       />
  //     ))
  //   )}
  

  //   fetchJobs()
  // }, [email,jobs])
  
  const [sortedJobs, setSortedJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs () {
      // Fetch jobs and order from server
      const res = await axios.get('https://linkedoutbackend.onrender.com/user/jobs')
      const returnedjobs = res.data.jobs
      const newres = await axios.get('https://linkedoutbackend.onrender.com/admin/getorder')
      const order= newres.data.order;
  
      // Sort jobs according to order
      const sortedJobs = [];
      order.forEach((jobId) => {
        const job = returnedjobs.find((job) => job.id === jobId);
        if (job) {
          sortedJobs.push(job);
        }
      });
  
      // Fetch applied jobs and filter out already applied jobs
      const res2 = await axios.post("https://linkedoutbackend.onrender.com/user/applied-jobs", {email: email});
      const appliedJobIds = res2.data.appliedJobs.map(job => job.id);
      const unappliedJobs = sortedJobs.filter(job => !appliedJobIds.includes(job.id));
  
      // Update the state of jobs and jobCards
      setJobs(sortedJobs)
      setJobCards(
        unappliedJobs.map(job => (
          <JobCard
            id={job.id}
            title={job.title}
            location={job.location}
            deadline={job.deadline}
            contact={job.contact}
            email={email}
          />
        ))
      )
    }
  
    fetchJobs()
  }, [email, sortedJobs])
  

  return (
    <div className="jobboard">
      <NavBar />
      <div id="cardholder">{jobCards}</div>
    </div>
  )
}

export default JobBoard
