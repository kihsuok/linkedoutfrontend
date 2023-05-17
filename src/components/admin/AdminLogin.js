import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import LoginNav from '../LoginNav'
import loadingimage from '../../loading.gif'

function AdminLogin () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()

  async function handleSubmit (event) {
    event.preventDefault()
    setLoading(true)
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
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="jobboard">
        <img src={loadingimage} alt="Loading..." style={{marginTop:"17%",marginLeft:"49%"}} />
      </div>
    )
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
