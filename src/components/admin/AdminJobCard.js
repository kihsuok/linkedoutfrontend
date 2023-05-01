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
  archived
}) {
  const archivestatus = !archived;
  async function handleApply () {
    axios.post('https://linkedoutbackend.onrender.com/admin/archive', {
      id: id,
      archived: archivestatus
    })
    // window.location.reload()
  }

  const calculateDaysLeft = () => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = calculateDaysLeft()
  const admincardClass = daysLeft > 7 ? 'job-card' : daysLeft > 3 ? 'job-cardwarning' : daysLeft > 0 ? 'job-carddanger' : 'job-cardexpired'


  return (
    <div>
      <Link to={`/job-applicants/${id}`}>
        <div className={admincardClass} id="admincard">
          <h2>{title}</h2>
          <p>Id: {id}</p>
          <p>Location: {location}</p>
          <p>Deadline: {deadline}</p>
          <p>Contact: {contact}</p>
          {archivestatus && <button id="archive" onClick={handleApply}> Archive </button>}
          {!archivestatus && <button id="unarchive" onClick={handleApply}> Unarchive </button>}
        </div>
      </Link>
    </div>
  )
}

export default JobCard
