import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import Loading from '../../../../components/Loading'
import toast from 'react-hot-toast'
import { getUserbyInfo } from '../../../../api/userApi/userApi'
import UserCard from '../../../../components/UserCard'

function SearchUser() {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      const response = await getUserbyInfo(searchQuery);
      setSearchResults(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Search failed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Search Section */}
      <div className="flex-none p-4 px-16 bg-white shadow-sm">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username or email..."
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-3">
            {loading ? (
              <Loading />
            ) : searchResults?.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                {searchQuery ? 'No users found' : 'Start searching to see users'}
              </div>
            ) : (
              searchResults?.map((user) => (
                <UserCard key={user._id} user={user} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchUser