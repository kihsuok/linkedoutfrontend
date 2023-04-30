import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function JobCard ({
  id,
  title,
  location,
  deadline,
  contact,
  email,
  hasApplied,
  archived
}) {

  

  const calculateDaysLeft = () => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = calculateDaysLeft()
  const cardClass = daysLeft > 7 ? 'job-card' : daysLeft > 3 ? 'job-cardwarning' : daysLeft > 0 ? 'job-carddanger' : 'job-cardexpired'


  const value = !hasApplied && daysLeft>0

  async function handleApply () {
    axios.post('https://linkedoutbackend.onrender.com/user/apply', {
      email: email,
      id: id
    })
    // window.location.reload()
  }

  return (
    <div>
      <Link to={`/job-description/${id}`}>
        <div className={cardClass} id="jobcard">
          <h2>{title}</h2>
          <p>Id: {id}</p>
          <p>Location: {location}</p>
          <p>Deadline: {deadline}</p>
          <p>Contact: {contact}</p>
          {value && <button id="apply" onClick={handleApply}> Apply </button>}
        </div>
      </Link>
    </div>
  )
}

export default JobCard
