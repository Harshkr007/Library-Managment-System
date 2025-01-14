import React from 'react'
import { Link } from 'react-router-dom'
import "./panel.css"

const UserAdminPanel = () => {
  return (
    <div>
        <div className='panel'>
            <Link to="/userlogin" className='panelButton'>User</Link>
            <Link to="/adminlogin" className='panelButton'>Admin</Link>
        </div>
    </div>
  )
}

export default UserAdminPanel