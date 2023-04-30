import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, Link } from 'react-router-dom'
import LoginNav from '../LoginNav'
import './cssfiles/login.css'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  async function handleSubmit (event) {
    event.preventDefault()

    const res = await axios.post('https://linkedoutbackend.onrender.com/user/login', {
      email: email,
      password: password
    })
    if (res.data.user) {
      localStorage.setItem('token', res.data.user)
      console.log('TOKEN : ', res.data.user)
      toast.success('Login Successful', { theme: 'colored' })
      nav('/job-board')
    } else {
      toast.error('Login Unsuccessful', { theme: 'colored' })
    }
  }

  return (
    <div>
      <LoginNav />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Login</button>
        <p>
          New here ? &nbsp;
          <Link to='/register'>Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
