import React from 'react'
import Sidebar from "./Sidebar/Sidebar"
import { Outlet } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { getMembershipByType } from '../../api/membershipApi/membershipApi'

import { setUserMemberShip } from '../../redux/UserMemberSlice.js/userMemberSlice'



function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)
  const user = useSelector(state => state.user.user);

  const handleGetUserMembershipDetails = async () => {
    if (!user?.membershipType) return;
    
    const membershipType = user.membershipType;
    try {
        const response = await getMembershipByType(membershipType);
        console.log(response.data)
        dispatch(setUserMemberShip(response.data.data));
    } catch (error) {
        console.log(error)
        toast.error("Failed to fetch membership details");
    }
  }

  const handleGetUserBooksDetails = async () => {
    try {
        const response = await getUserBooks();
        dispatch(setUserBook(response.data.data));
    } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user books");
    }
}

  useEffect(() => {
    if(accessToken === null){
      toast.error("Please login to continue")
      navigate('/loginUser')
    }
  },[accessToken])

  useEffect(() => {
    handleGetUserMembershipDetails();
    handleGetUserBooksDetails();
  },[accessToken])



  return (
    <div className="grid grid-cols-6 h-full gap-4">
      {/* Sidebar Section */}
      <div className="col-span-1 bg-gray-100 shadow-md rounded-lg p-4 overflow-hidden">
        <Sidebar/>
      </div>
      
      {/* Main Content Section */}
      <div className="col-span-5 bg-white shadow-md rounded-lg p-4 overflow-hidden">
        <Outlet/>
      </div>
    </div>
  )
}

export default Home