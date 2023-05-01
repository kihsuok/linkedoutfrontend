import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JobCard({
  id,
  title,
  location,
  deadline,
  contact,
  email,
  hasApplied,
  archived
}) {
  const [applied, setApplied] = useState(hasApplied);

  const calculateDaysLeft = () => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft();
  const cardClass =
    daysLeft > 7
      ? 'job-card'
      : daysLeft > 3
      ? 'job-cardwarning'
      : daysLeft > 0
      ? 'job-carddanger'
      : 'job-cardexpired';

  async function handleApply() {
    try {
      await axios.post('https://linkedoutbackend.onrender.com/user/apply', {
        email: email,
        id: id
      });
      setApplied(true);
    } catch (error) {
      console.log(error);
    }
  }

  const shouldDisplayApplyButton = !applied && daysLeft > 0;

  return (
    <div>
      
        <div className={cardClass} id="jobcard">
          <h2>{title}</h2>
          <p>Id: {id}</p>
          <p>Location: {location}</p>
          <p>Deadline: {deadline}</p>
          <p>Contact: {contact}</p>
          {shouldDisplayApplyButton && (
            <button id="apply" onClick={handleApply}>
              Apply
            </button>
          )}
        <Link to={`/job-description/${id}`}>
          <button id="viewdescription"> View Job Description</button>
        </Link>
        </div>
      
    </div>
  );
}

export default JobCard;
