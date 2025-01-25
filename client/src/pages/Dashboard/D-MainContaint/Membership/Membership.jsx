import React, { useState, useEffect } from 'react'
import MembershipCard from '../../../../components/MembershipCard'
import Loading from '../../../../components/Loading'
import { getAllMembership } from '../../../../api/membershipApi/membershipApi'
import toast from 'react-hot-toast'

function Membership() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await getAllMembership()
        console.log(response)
        setMemberships(response.data.data)
        console.log(memberships)
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch memberships')
      } finally {
        setLoading(false)
      }
    }
    fetchMemberships()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="h-full overflow-hidden p-6">
      <div className="h-full overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((membership) => (
            <MembershipCard key={membership._id} membership={membership} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Membership