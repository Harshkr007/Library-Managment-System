import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserbyInfo } from '../../../../api/userApi/userApi'
import Loading from '../../../../components/Loading'
import { FaUserCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { IoIosArrowDropleft } from "react-icons/io";

function UserInfo() {
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const location = useLocation()
  const navigate = useNavigate();

  const avatar = "https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp"

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log(location.state.userId)
        const response = await getUserbyInfo(location.state.userId)
        setUserInfo(response.data.data[0])
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch user info')
      } finally {
        setLoading(false)
      }
    }
    fetchUserInfo()
  }, [location.state.userId])

  if (loading) return <Loading />


  console.log(userInfo)

  return (
    <div className="grid grid-cols-6 h-full gap-4">
      {/* User Info Section */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow-md relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 left-2 p-1 rounded-full hover:bg-gray-100 z-50"
        >
          <IoIosArrowDropleft className="text-2xl text-gray-600 hover:text-gray-800" />
        </button>
        
        <div className="flex flex-col items-center space-y-4 mt-8">
          {avatar ? (
            <img 
              src={avatar} //TODO: Change this to userInfo.avatar
              alt={userInfo.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{userInfo?.name}</h2>
            <p className="text-gray-600">{userInfo?.email}</p>
          </div>
          <div className="w-full pt-4 border-t">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Membership</h3>
            <p className="text-gray-600">Type: {userInfo?.membershipType || 'None'}</p>
            <p className="text-gray-600">Expires: {
              userInfo?.membershipExpiryDate
                ? new Date(userInfo.membershipExpiryDate).toLocaleDateString() 
                : 'N/A'
            }</p>
          </div>
        </div>
      </div>

      {/* Book History Section */}
      //TODO: need to implement logic to get te book history of the user
      <div className="col-span-5 bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 p-4 bg-gray-50 border-b">
          Book Issue History
        </h2>
        <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100% - 4rem)' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userInfo?.bookHistory?.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.bookName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(book.issueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {book.returnDate ? new Date(book.returnDate).toLocaleDateString() : 'Not returned'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      book.returnDate 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {book.returnDate ? 'Returned' : 'Issued'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserInfo