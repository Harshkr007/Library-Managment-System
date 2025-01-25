import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

function Dashboard() {
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.admin.accessToken)
  useEffect(() => {
    if(accessToken === null){
      toast.error("Please login to continue")
      navigate('/loginUser')
    }
  },[accessToken])


  return (
    <div className="grid grid-cols-6 h-full gap-4">
      <div className="col-span-1 bg-gray-100 shadow-md rounded-lg p-4 overflow-hidden">
        <Sidebar/>
      </div>
      
      <div className="col-span-5 bg-white shadow-md rounded-lg p-4 overflow-hidden">
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard