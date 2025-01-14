import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'

const Logout = () => {

    const {authToken}=useAuth()

    const navigate=useNavigate()

   const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate("/userlogin")
    }

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout