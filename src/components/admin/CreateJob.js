import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import loadingimage from '../../loading.gif'

const CreateJob = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const nav=useNavigate();

  useEffect(() => {
    const checkAuthorization = () => {
      console.log('AUTHENTICATING')
      const token = localStorage.getItem('token')
      if (token) {
        const admin = jwt.decode(token)
        console.log('USER WHILE AUTHENTICATING : ', admin)
        if (!admin) {
          localStorage.removeItem('token')
          nav('/login')
        } else {
          setEmail(admin.email)
        }
      } else nav('/login')
    }
    checkAuthorization()
  }, [nav])

  async function AddJob (
    id,
    title,
    description,
    deadline,
    location,
    contact
  ) {
    setLoading(true)
    const res = await fetch('https://linkedoutbackend.onrender.com/admin/createjob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
        location: location,
        deadline: deadline,
        contact: contact,
      })
    })

    const data = await res.json()
    console.log(data)
    setLoading(false)

    if (data.status === 'ok') {
      toast.success('Job created successfully!', { theme: 'colored' })
      // Redirect the user to the sign-in page
      nav('/admin-board')
    } else {
      toast.error('Failed to create job', { theme: 'colored' })
    }
  }

  async function handleSubmit (event) {
    event.preventDefault()

    console.log('SUBMITTED')
    toast.success('Job Added', { theme: 'colored' })

    AddJob(id, title, description, deadline, location, contact)
  }


  if (loading) {
    return (
      <div className="jobboard">
        <AdminNav />
        <img src={loadingimage} alt="Loading..." style={{marginTop:"17%",marginLeft:"49%"}} />
      </div>
    )
  } 

  return (
    <div>
      <AdminNav />
      <form onSubmit={handleSubmit} id="createjob">
        <label htmlFor="id">Job ID:</label>
          <input
            type="number"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            
          />
          <br/>
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br/>
          <label htmlFor="description">Job Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br/>

          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <br/>

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br/>

          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <br/>

          <button type="submit">AddJob</button>
      </form>
    </div>
  );
};

export default CreateJob;
