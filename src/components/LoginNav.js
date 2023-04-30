import React from 'react'
import { Link } from 'react-router-dom'
import './loginnav.css'

function LoginNav () {

  return (
    <div>
      <nav id="loginnav" >
        <ul>
          
          <li>
            <Link to='/login'>User Login</Link>
          </li>
          <li>
            <Link to='/admin-login'>Admin login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default LoginNav
