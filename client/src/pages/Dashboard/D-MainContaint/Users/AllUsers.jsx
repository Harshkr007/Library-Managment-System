import React, { useState, useEffect } from 'react'

import Loading from '../../../../components/Loading'
import toast from 'react-hot-toast'
import { getAllUsers } from '../../../../api/userApi/userApi'

import UserCard from '../../../../components/UserCard'

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(error?.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">All Users</h1>
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-center text-gray-500">No users found</p>
            ) : (
              users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;