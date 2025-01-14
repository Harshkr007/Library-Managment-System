import "./auth.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthProvider'
import UserAdminPanel from "../components/UserAdminPanel"

const AdminLogin = () => {

    const navigate=useNavigate()

    const {authToken, setAuthToken}=useAuth()

    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8005/api/v1/admin/login", {
                email,
                password
            });
            console.log(response);
            if(!response.data.token){
                alert("email or password didn't match")
            }
            setAuthToken(response.data.token)
            localStorage.setItem("token", response.data.token);
            navigate("/")
        } catch (error) {
                console.error("Error during login", error);
        }
    }
    
  return (
    <div>
        <div><UserAdminPanel /></div>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input name='email' id='email' type='email' placeholder="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <label htmlFor='password'>Password</label>
            <input name='password' id='password' type='password' placeholder="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <input type='submit' value="Login" />
        </form>
        <p>Not have an account, <Link to="/adminsignup">Register as Admin</Link></p>
    </div>
  )
}

export default AdminLogin