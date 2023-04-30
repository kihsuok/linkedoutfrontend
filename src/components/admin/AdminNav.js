import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import './cssfiles/adminnav.css'


function AdminNav () {
  const nav = useNavigate()

  function handleLogout () {
    localStorage.clear()
    nav('/login')
  }

  return (
    <div>
      <nav id="adminnav">
        <ul>
          <li>
            <Link to='/admin-board'>Job Board</Link>
          </li>
          <li>
            <Link to='/create-job'>Create</Link>
          </li>
          <button id="adminlogout" onClick={handleLogout}> Logout </button>
        </ul>
      </nav>
    </div>
  )
}

export default AdminNav
