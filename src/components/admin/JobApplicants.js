import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import loadingimage from '../../loading.gif'

function JobApplicants () {
    const nav = useNavigate();
  const { id } = useParams()

  const [applicantEmails, setApplicantEmails] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchApplicantEmails () {
      setLoading(true)
      const res = await axios.post(
        'https://linkedoutbackend.onrender.com/admin/job-applicants',
        { id: id }
      )
      console.log(res.data);
      setApplicantEmails(res.data.jobApplicants)
      console.log(res.data.jobApplicants);
      setLoading(false)
    }
    fetchApplicantEmails()
  }, [id])

  function handleClick (email) {
    nav(`/applicant-profile/${email}`)
  }

  if (loading) {
    return (
      <div className="jobboard">
        <img src={loadingimage} alt="Loading..." style={{marginTop:"17%",marginLeft:"49%"}} />
      </div>
    )
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
