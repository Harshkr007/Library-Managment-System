import React, { useRef, useState } from "react";

import { FaAngleRight } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkStar } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { LuUserRoundSearch } from "react-icons/lu";
import { RiUserLine } from "react-icons/ri";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {logout} from "../../../redux/AdminSlice/adminSlice";
import toast from "react-hot-toast";


const rotateIcon = {
  transform: "rotate(90deg)",
  transformOrigin: "center",
  transition: "transform 0.2s ease",
};

function Sidebar() {
  const ddom = useRef("");
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin.admin);
  console.log(adminInfo);

  const [clicked, setClicked] = useState([]);
  const handleClick = () => {
    console.log(ddom.current);
    if (clicked.includes(ddom.current)) {
      setClicked(clicked.filter((item) => item !== ddom.current));
    } else {
      setClicked([...clicked, ddom.current]);
    }
  };

  const handleAdminLogout = () => {
        dispatch(logout());
        toast.success("Logout successful");
  }

  const navigate = useNavigate();
  const route = useRef("");
  const handleNavigate = () => {
    navigate(route.current);
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className=" flex text-xl font-semibold text-gray-800 justify-center mb-4">
        Dashboard Menu
      </h2>
      <div>
        <nav className="flex flex-col space-y-4 cursor-pointer">
          <div className="Book w-full p-2 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-between"
            onClick={() => {
              ddom.current = "Book";
              handleClick();
            }}>
            <p className="">Book</p>
            <FaAngleRight
              className="mt-1 item-center"
              style={clicked.includes("Book") ? rotateIcon : {}}
            />
          </div>
          {clicked.includes("Book") && (
            <div className="ml-4">
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/viewBook" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/viewBook";
                  handleNavigate();
                }}
              >
                <BsBookmarkStar className="mt-1" />
                <p className="ml-2">View Book</p>
              </div>
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/addBook" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/addBook";
                  handleNavigate();
                }}>
                <BsBookmarkPlus className="mt-1" />
                <p className="ml-2">Add Book</p>
              </div>
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/searchBook" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/searchBook";
                  handleNavigate();
                }}>
                <AiOutlineFileSearch className="mt-1" />
                <p className="ml-2">Search Book</p>
              </div>
            </div>
          )}
          <div
            className="Users w-full p-2 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-between"
            onClick={() => {
              ddom.current = "Users";
              handleClick();
            }}
          >
            <p className="">Users</p>
            <FaAngleRight
              className="mt-1 item-center"
              style={clicked.includes("Users") ? rotateIcon : {}}
            />
          </div>
          {clicked.includes("Users") && (
            <div className="ml-4">
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/allUsers" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/allUsers";
                  handleNavigate();
                }}>
                <RiUserLine className="mt-2" />
                <p className="ml-2">All Users</p>
              </div>
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/searchUser" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/searchUser";
                  handleNavigate();
                }}>
                <LuUserRoundSearch className="mt-1" />
                <p className="ml-2">Search Users</p>
              </div>
            </div>
          )}
          <div className="Membership w-full p-2 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-between"
            onClick={() => {
              ddom.current = "Membership";
              handleClick();
            }}>
            <p className="">Membership</p>
            <FaAngleRight
              className="mt-1 item-center"
              style={clicked.includes("Membership") ? rotateIcon : {}}
            />
          </div>
          {clicked.includes("Membership") && (
            <div className="ml-4">
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/Membership" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/Membership";
                  handleNavigate();
                }}>
                < MdLibraryBooks className="mt-1" />
                <p className="ml-2">Membership</p>
              </div>
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600  hover:bg-gray-300 flex justify-start ${route.current === "/dashboard/addMembership" ? "bg-gray-300" : ""}`}
                onClick={() => {
                  route.current = "/dashboard/addMembership";
                  handleNavigate();
                }}>
                <MdOutlineAddToPhotos className="mt-1" />
                <p className="ml-2">Add Membership</p>
              </div>
            </div>
          )}
        </nav>
      </div>
<div className="mt-auto border-t border-gray-200">
  <div className="flex items-center justify-between p-3 text-gray-600 hover:bg-gray-200 rounded-lg mt-1">
    <p className="text-lg font-medium truncate">{adminInfo?.name}</p>
    <div className="flex items-center space-x-3">
      <button 
        onClick={() => {
          route.current = "/dashboard/editAdmit";
          handleNavigate();
        }}
        className="p-1.5 rounded-full hover:bg-gray-300 transition-colors"
      >
        <IoIosSettings 
          className="text-xl text-gray-600 hover:text-blue-600" 
          style={clicked.includes("UserSettings") ? rotateIcon : {}}
        />
      </button>
      <button 
        onClick={() => {
          handleAdminLogout();
        }}
        className="p-1.5 rounded-full hover:bg-gray-300 transition-colors"
      >
        <CgLogOut 
          className="text-xl text-gray-600 hover:text-red-600" 
        />
      </button>
    </div>
  </div>
</div>
    </div>
  );
}

export default Sidebar;
