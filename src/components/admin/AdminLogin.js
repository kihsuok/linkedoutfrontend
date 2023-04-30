import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import LoginNav from '../LoginNav'

function AdminLogin () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  async function handleSubmit (event) {
    event.preventDefault()

    const res = await axios.post('https://linkedoutbackend.onrender.com/admin/login', {
      email: email,
      password: password
    })
    if (res.data.admin) {
      localStorage.setItem('token', res.data.admin)
      console.log('TOKEN : ', res.data.admin)
      toast.success('Login Successful', { theme: 'colored' })
      nav('/admin-board')
    } else {
      toast.error('Login Unsuccessful', { theme: 'colored' })
    }
  }

  return (
    <div>
      <LoginNav />
      <h1>Admin Login</h1>
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
        
      </form>
    </div>
  )
}

export default AdminLogin
