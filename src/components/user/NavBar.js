import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import './cssfiles/nav.css'

function NavBar () {
  const nav = useNavigate()

  function handleLogout () {
    localStorage.clear()
    nav('/login')
  }

  return (
    <div>
      <nav id="usernav">
        <ul>
          <li>
            <Link to='/job-board'>Job Board</Link>
          </li>
          <li>
            <Link to='/applied-jobs'>Applied Jobs</Link>
          </li>
          <li>
            <Link to='/profile'>My Profile</Link>
          </li>
          <button id="logout" onClick={handleLogout}> Logout </button>
          </ul>
          
      </nav>
    </div>
  )
}

export default NavBar
