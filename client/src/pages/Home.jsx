import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./home.css"
import {jwtDecode} from "jwt-decode";
import { useAuth } from '../contexts/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import Books from '../components/Books';

const Home = () => {

    const [books, setBooks]=useState([])
    const [users, setUsers]=useState([])
    const [user, setUser]=useState()
    const [type, setType]=useState("")
    const [email, setEmail]=useState("")

    const [curr, setCurr]=useState("")

    const navigate=useNavigate()
    const {authToken}=useAuth()

    if(!authToken){
        // return navigate("/userlogin")
        return <Navigate to="/userlogin" replace />;
    }

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const decoded=jwtDecode(token)
        console.log(decoded)
        setType(decoded.type)
        setEmail(decoded.email)
        console.log(type)
    }, [])

    const getBooks=async()=>{
        setCurr("books")
        try {
            const response=await axios.get("http://localhost:8005/api/v1/books")
            console.log(response.data)
            setBooks(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    const getUsers=async()=>{
        setCurr("users")
        try {
            const response=await axios.get("http://localhost:8005/api/v1/user/users")
            setUsers(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const profile=async()=>{
        setCurr("user")
        try {
            const response=await axios.post("http://localhost:8005/api/v1/user/user",{
                email:email
            })
            setUsers(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        {authToken?<Logout />:<div></div>}
        <h1>Home</h1>
        <button onClick={getBooks}>Books</button>
        {type=="admin"?<button onClick={getUsers}>Users</button>:<button onClick={profile}>Profile</button>}
        {type=="admin"?<div><button>Add Book</button><button>Add user</button></div>:<></>}
        {curr=="books" && books.map(book => (
            <div className='books' key={book._id}>
                <p>id: {book._id}</p>
                <h3>title: {book.title}</h3>
                <p>author: {book.author}</p>
                <p>category: {book.category}</p>
                <p>serial No.: {book.serialNo}</p>
                {type=="admin"?<div><button>update</button><button>delete</button></div>:<button>issue</button>}
            </div>
        ))}
        {/* {curr=="books"?<Books />:<></>} */}
        {curr=="users" && users.map(user=>(
            <div className='users' key={user._id}>
                <p>userId: {user._id}</p>
                <p>username: {user.username}</p>
                {user.isActive==true?<p>Active</p>:<p>Not Active</p>}
                <p>joining date: {user.joinedDate}</p>
                <p>last date: {user.lastDate}</p>
                <p>email: {user.email}</p>
                <button>update</button>
                <button>delete</button>
            </div>
        ))}
    </div>
  )
}

export default Home