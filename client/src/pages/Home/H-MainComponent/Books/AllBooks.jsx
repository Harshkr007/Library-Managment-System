import React, { useState, useEffect } from 'react'
import Book from '../../../../components/Book'
import Loading from '../../../../components/Loading'
import { getBooks } from '../../../../api/bookApi/bookApi'
import toast from 'react-hot-toast'

function AllBooks() {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const response = await getBooks()
        setBooks(response.data.data)
      } catch (error) {
        console.error('Error fetching books:', error)
        toast.error(error?.response?.data?.message || 'Failed to fetch books')
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-3">
          {loading ? (
            <Loading />
          ) : books?.length === 0 ? (
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              No books available
            </h1>
          ) : (
            books?.map((book) => (
              <Book key={book._id || book.serialNo} props={book} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllBooks