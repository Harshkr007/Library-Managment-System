import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


function UserCard({ user }) {
    const navigate = useNavigate();
    const avatar = "https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp"
    
    return (
      <div 
        onClick={() => navigate('/dashboard/userInfo', { state: { userId: user._id } })}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img 
                src={avatar} 
                alt={user.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  export default UserCard;