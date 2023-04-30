import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function RegisterPage () {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [experience, setExperience] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const nav = useNavigate()

  async function checkEmailExists (email) {
    return false
  }

  async function registerUser (
    name,
    dob,
    email,
    phone,
    qualifications,
    experience,
    password
  ) {
    const res = await fetch('https://linkedoutbackend.onrender.com/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        dob: dob,
        email: email,
        phone: phone,
        qualifications: qualifications,
        experience: experience,
        password: password,
        appliedJobs: []
      })
    })

    const data = await res.json()
    console.log(data)

    if (data.status === 'ok') {
      toast.success('User account created successfully!', { theme: 'colored' })
      // Redirect the user to the sign-in page
      nav('/login')
    } else {
      toast.error('Failed to create user account', { theme: 'colored' })
    }
  }

  async function handleSubmit (event) {
    event.preventDefault()

    console.log('SUBMITTED')
    console.log(experience)

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { theme: 'colored' })
      return
    }

    if (await checkEmailExists(email)) {
      toast.error('Email exists already!!', { theme: 'colored' })
      return
    }

    registerUser(name, dob, email, phone, qualifications, experience, password)
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <br />
        <label htmlFor='dob'>Date of Birth:</label>
        <input
          type='date'
          id='dob'
          value={dob}
          onChange={event => setDob(event.target.value)}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <br />
        <label htmlFor='phone'>Phone Number:</label>
        <input
          type='tel'
          id='phone'
          value={phone}
          onChange={event => setPhone(event.target.value)}
        />
        <br />
        <label htmlFor='qualifications'>Qualifications:</label>
        <textarea
          id='qualifications'
          value={qualifications}
          onChange={event => setQualifications(event.target.value)}
        ></textarea>
        <br />
        <label htmlFor='experience'>Experience:</label>
        <textarea
          id='experience'
          value={experience}
          onChange={event => setExperience(event.target.value)}
        ></textarea>
        <br />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <br />
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
        <br />
        <button type='submit'>Register</button>
        <p>
          Already have an account?
          <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
