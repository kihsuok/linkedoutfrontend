import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Profile () {
  const { email } = useParams()
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState()
  const [qualifications, setQualifications] = useState()
  const [experience, setExperience] = useState()

  useEffect(() => {
    console.log("FETCHING");
    async function fetchProfile () {
      const res = await axios.post(
        'https://linkedoutbackend.onrender.com/admin/applicant-profile',
        { email: email }
      )
      console.log("RES:", res);
      setName(res.data.jobApplicant.name)
      setDob(res.data.jobApplicant.dob)
      setPhone(res.data.jobApplicant.phone)
      setQualifications(res.data.jobApplicant.qualifications)
      setExperience(res.data.jobApplicant.experience)
    }
    fetchProfile();
  }, [email])

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <p>Name: {name}</p>
        <p>Date of Birth: {dob}</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phone}</p>
        <p>Qualifications: {qualifications}</p>
        <p>Experience: {experience}</p>
      </div>
    </div>
  )
}

export default Profile
