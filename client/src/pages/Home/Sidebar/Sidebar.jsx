import React, { useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { MdLibraryBooks } from "react-icons/md";
import { BsBook, BsBookmarkHeart } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/UserSlice/userSlice";
import toast from "react-hot-toast";

const rotateIcon = {
  transform: "rotate(90deg)",
  transformOrigin: "center",
  transition: "transform 0.2s ease",
};

function Sidebar() {
  const ddom = useRef("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);
  const [clicked, setClicked] = useState([]);

  const handleClick = () => {
    if (clicked.includes(ddom.current)) {
      setClicked(clicked.filter((item) => item !== ddom.current));
    } else {
      setClicked([...clicked, ddom.current]);
    }
  };

  const handleUserLogout = () => {
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
      <h2 className="flex text-xl font-semibold text-gray-800 justify-center mb-4">
        Library Menu
      </h2>
      <div>
        <nav className="flex flex-col space-y-4 cursor-pointer">
          {/* Books Section */}
          <div className="Book w-full p-2 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-between"
            onClick={() => {
              ddom.current = "Book";
              handleClick();
            }}>
            <p className="">Books</p>
            <FaAngleRight
              className="mt-1 item-center"
              style={clicked.includes("Book") ? rotateIcon : {}}
            />
          </div>
          {clicked.includes("Book") && (
            <div className="ml-4">
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-start`}
                onClick={() => {
                  route.current = "/allBooks";
                  handleNavigate();
                }}>
                <BsBook className="mt-1" />
                <p className="ml-2">All Books</p>
              </div>
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-start`}
                onClick={() => {
                  route.current = "/myBooks";
                  handleNavigate();
                }}>
                <BsBookmarkHeart className="mt-1" />
                <p className="ml-2">My Books</p>
              </div>
            </div>
          )}

          {/* Membership Section */}
          <div className="Membership w-full p-2 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-between"
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
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-start`}
                onClick={() => {
                  route.current = "/allMembership";
                  handleNavigate();
                }}>
                <MdLibraryBooks className="mt-1" />
                <p className="ml-2">All Membership</p>
              </div>
              <div className={`w-full p-1 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-start`}
                onClick={() => {
                  route.current = "/myMembership";
                  handleNavigate();
                }}>
                <MdLibraryBooks className="mt-1" />
                <p className="ml-2">My Membership</p>
              </div>
            </div>
          )}

          {/* Transactions Section */}
          <div className={`w-full p-2 rounded text-gray-600 hover:text-blue-600 hover:bg-gray-300 flex justify-start`}
            onClick={() => {
              route.current = "/showTransations";
              handleNavigate();
            }}>
            <RiMoneyDollarCircleLine className="mt-1" />
            <p className="ml-2">Transactions</p>
          </div>
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="mt-auto border-t border-gray-200">
        <div className="flex items-center justify-between p-3 text-gray-600 hover:bg-gray-200 rounded-lg mt-1">
          <p className="text-lg font-medium truncate">{userInfo?.name}</p>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                route.current = "/editUser";
                handleNavigate();
              }}
              className="p-1.5 rounded-full hover:bg-gray-300 transition-colors"
            >
              <IoIosSettings 
                className="text-xl text-gray-600 hover:text-blue-600"
              />
            </button>
            <button 
              onClick={handleUserLogout}
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