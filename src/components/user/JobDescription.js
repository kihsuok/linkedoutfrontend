import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function JobDescription () {
  const { id } = useParams()

  const [description, setDescription] = useState('')

  useEffect(() => {
    async function fetchJobDesc () {
      const res = await axios.post(
        'https://linkedoutbackend.onrender.com/user/job-description',
        { id: id }
      )
      setDescription(res.data.description)
    }
    fetchJobDesc()
  }, [id])

  return (
    <div  >
      <h1>Job Description for Job {id}</h1>
      <p>This is the description for job {id}.</p>
      <pre id="jobdesc"> {description}</pre>
    </div>
  )
}

export default JobDescription
