import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin.jsx'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import AdminSignup from './pages/AdminSignup.jsx'
import Logout from './components/Logout.jsx'
import { useAuth } from './contexts/AuthProvider.jsx'

const App = () => {

  const {authToken}=useAuth()

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/usersignup' element={<UserSignup />} />
        <Route path='/adminsignup' element={<AdminSignup />} />
      </Routes>
    </div>
  )
}

export default App