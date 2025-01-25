import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MembershipCard({ membership }) {
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();
  const admin = useSelector(state => state.admin.admin);
  const user = useSelector(state => state.user.user);

  const handleBuyMembership = () => {
    navigate('/newTransation', { 
      state: {
        type: 'Membership',
        membershipType: membership.membershipType,
        price: membership.price,
        duration: membership.duration,
        benefits: membership.benefits
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="bg-blue-500 p-4 text-white">
        <h3 className="text-xl font-bold">{membership.membershipType}</h3>
        <p className="text-2xl font-bold mt-2">₹{membership.price}</p>
        <p className="text-sm opacity-75">{membership.duration} months</p>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1">
        <h4 className="font-semibold mb-4">Benefits:</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600">
            <span className="mr-2">•</span>
            Book Issue Limit: {membership.benefits.BookIssueLimit}
          </li>
          <li className="flex items-center text-gray-600">
            <span className="mr-2">•</span>
            Issue Duration: {membership.benefits.BookIssueTime} days
          </li>
          <li className="flex items-center text-gray-600">
            <span className="mr-2">•</span>
            Fine per day: ₹{membership.benefits.FinePerDay}
          </li>
        </ul>
      </div>

      {/* Add Buy Button for Users */}
      {user && !admin && (
        <div className="p-4 border-t">
          <button
            onClick={handleBuyMembership}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Buy Membership
          </button>
        </div>
      )}

      {/* User Section Toggle */}
      <div className="border-t">
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="w-full p-4 text-left flex items-center justify-between text-gray-600 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            <span>View Members</span>
          </div>
          {showUsers ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {/* Users List */}
      {showUsers && (
        <div className="max-h-48 overflow-y-auto custom-scrollbar border-t">
          <div className="p-4 space-y-2">
            {membership.users?.length > 0 ? (
              membership.users.map((user) => (
                <div key={user._id} className="flex items-center justify-between py-2 px-4 hover:bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    new Date(user.endDate) > new Date()
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {new Date(user.endDate) > new Date() ? 'Active' : 'Expired'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No members found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MembershipCard