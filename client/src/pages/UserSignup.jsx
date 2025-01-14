import "./auth.css"
import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import UserAdminPanel from "../components/UserAdminPanel";

const UserSignup = () => {

    const navigate=useNavigate()

    const { authToken, setAuthToken } = useAuth();

    const [username, setUsername]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8005/api/v1/user/signup", {
                username,
                email,
                password
            });
            console.log(response);
            setAuthToken(response.data.token)
            localStorage.setItem("token", response.data.token);
            navigate("/")
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("Email already exists");
            } else {
                console.error("Error during signup", error);
            }
        }
    };
    
  return (
    <div>
        <div><UserAdminPanel /></div>
        <h1>User SignUp</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input name='username' id='username' type='text' placeholder="username" required value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            <label htmlFor='email'>Email</label>
            <input name='email' id='email' type='email' placeholder="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <label htmlFor='password'>Password</label>
            <input name='password' id='password' type='password' placeholder="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <input type='submit' value="SignUp" />
        </form>
        <p>Already have an account, <Link to="/userlogin">Login as User</Link></p>
    </div>
  )
}

export default UserSignup