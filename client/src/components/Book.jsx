import React from 'react'

import { GrFormEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Book({props}) {
    const {
      title: bookName,
      author : authorName,
      genre,
      serialNo,
      imageUrl,
      availability
    } = props;
    
    const admin = useSelector(state => state.admin.admin);
    const user = useSelector(state => state.user.user);
    const userMembership = useSelector(state => state.userMembership.userMemberShip);
    const userBooks = useSelector(state => state.userBook.userBook);
    const navigate = useNavigate();

    const canIssueBook = () => {
      if (!userMembership || !userBooks) return false;
      const currentlyIssuedBooks = Array.isArray(userBooks) ? userBooks.length : 0;
      return currentlyIssuedBooks < userMembership.benefits.BookIssueLimit;
    }
    const handleIssueBook = () => {
      navigate('/newTransation', { 
          state: {
              serialNo,
              bookName,
              authorName,
              imageUrl
          }
      });
  }

    const handleNavigateToUpdateBook = () => {
      const bookData = {
        title: bookName,
        author: authorName,
        genre,
        serialNo,
        imageUrl
      };
      navigate('/dashboard/updateBook', { state: bookData });
    }

    const handleDeleteBook = () => {}

  
    return (
      <div className="grid grid-cols-6 gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className="col-span-1">
        <div className="aspect-[3/4] rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={bookName} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
  
        {/* Content Section */}
        <div className="col-span-5 flex flex-col justify-around space-y-3">
          {/* Section 1: Book Name & Actions */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{bookName}</h2>
            {admin !== null && (
                <div className="flex justify-between space-x-5">
                  <GrFormEdit 
                    className="text-xl cursor-pointer hover:text-blue-600"
                    onClick={() => {handleNavigateToUpdateBook()}}
                  />
                  <RiDeleteBin5Line 
                    className="text-xl cursor-pointer hover:text-red-600"
                    onClick={() => {handleDeleteBook()}}
                    />
                </div>
              )}
          </div>
  
          {/* Section 2: Author */}
          <div className="text-gray-600">
            <span className="font-bold">Author :</span> {authorName}
          </div>
  
          {/* Section 3: Genre */}
          <div className="text-gray-600">
            <span className="font-bold">Genre :</span> {genre}
          </div>
  
          {/* Section 4: Serial No & Status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              <span className="font-bold">Serial No :</span> {serialNo}
            </span>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${
                availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {availability ? 'Available' : 'Issued'}
              </span>
              
              {user && !admin && availability && (
                <button
                  onClick={handleIssueBook}
                  disabled={!canIssueBook()}
                  className={`px-4 py-1 rounded-md text-sm font-medium transition-colors
                    ${canIssueBook() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Issue Book
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Book;