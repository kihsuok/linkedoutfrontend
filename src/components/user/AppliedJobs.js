import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react';
import NavBar from './NavBar'
import JobCard from './JobCard'
import jwt from "jsonwebtoken";
import './cssfiles/jobboard.css';
import loadingimage from '../../loading.gif'


function AppliedJobs () {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const checkAuthorization = () => {
      console.log("AUTHENTICATING");
      const token = localStorage.getItem("token");
      if (token) {
        const user = jwt.decode(token);
        console.log("USER WHILE AUTHENTICATING : ", user);
        if (!user) {
          localStorage.removeItem("token");
          nav("/login");
        }
        else {
            setEmail(user.email);
        }
      }
      else nav("/login");
    };
    checkAuthorization();
  }, [nav]);

  const [appliedJobCards, setAppliedJobCards] = useState([]);




  useEffect(() => {
    async function fetchAppliedJobs() {
      setLoading(true)
        const res = await axios.post("https://linkedoutbackend.onrender.com/user/applied-jobs", {email: email});
        const appliedJobs = res.data.appliedJobs;
        // console.log("applied job ids:" ,appliedJobIds);
        // const res2 = await axios.get('http://localhost:3000/user/jobs')
        // const jobs = res2.data.jobs
        // const appliedJobs = jobs.filter(job => appliedJobIds.includes(job.id))
        

            setAppliedJobCards(
                appliedJobs.map(job =>
                <JobCard
                id={job.id}
                title={job.title}
                location={job.location}
                deadline={job.deadline}
                contact={job.contact}
                hasApplied={true}
                />));
                setLoading(false)
            
    }
    // if (email != "") 
    fetchAppliedJobs();
  }, [email]);

  if (loading) {
    return (
      <div className="jobboard">
        <NavBar />
        <img src={loadingimage} alt="Loading..." style={{marginTop:"17%",marginLeft:"49%"}} />
      </div>
    )
  } 

  return (
    <div>
      <NavBar />
      <div id="appliedcard">{appliedJobCards}</div>
    </div>
  )
}

export default AppliedJobs
