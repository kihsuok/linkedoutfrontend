import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function JobApplicants () {
    const nav = useNavigate();
  const { id } = useParams()

  const [applicantEmails, setApplicantEmails] = useState([])

  useEffect(() => {
    async function fetchApplicantEmails () {
      const res = await axios.post(
        'https://linkedoutbackend.onrender.com/admin/job-applicants',
        { id: id }
      )
      console.log(res.data);
      setApplicantEmails(res.data.jobApplicants)
      console.log(res.data.jobApplicants);
    }
    fetchApplicantEmails()
  }, [id])

  function handleClick (email) {
    nav(`/applicant-profile/${email}`)
  }

  return (
    <div id="applicantlist">
      <h1> Applicant Mail IDs {id}</h1>
      {/* <p>This is the description for job {id}.</p> */}
      <ol>
        {applicantEmails.map(email => (
          <li>
            <button id="applicant"
              onClick={() => {
                handleClick(email)
              }}
            >
              {' '}
              {email}{' '}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default JobApplicants
