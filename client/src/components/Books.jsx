import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Books = () => {

  const [books, setBooks]=useState([])

  useEffect(()=>{
    async()=>{
      try {
          const response=await axios.get("http://localhost:8005/api/v1/books")
          console.log(response.data)
          setBooks(response.data)
      } catch (error) {
          console.log(error)
      }
    }
  },[])

  return (
    <div>
      {books.map(book => (
          <div className='books' key={book._id}>
              <p>id: {book._id}</p>
              <h3>title: {book.title}</h3>
              <p>author: {book.author}</p>
              <p>category: {book.category}</p>
              <p>serial No.: {book.serialNo}</p>
              {type=="admin"?<div><button>update</button><button>delete</button></div>:<button>issue</button>}
          </div>
      ))}
    </div>
  )
}

export default Books