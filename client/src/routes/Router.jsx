import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Register from "../pages/Register/Register";
import UserLogin from "../pages/Login/UserLogin";
import AdminLogin from "../pages/Login/AdminLogin";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Welcome from "../pages/Dashboard/D-MainContaint/Welcome";
import EditAdmin from "../pages/Dashboard/D-MainContaint/EditAdminDetails/EditAdmin";
import AddBook from "../pages/Dashboard/D-MainContaint/Book/AddBook";
import ViewBook from "../pages/Dashboard/D-MainContaint/Book/ViewBook";
import AddMembership from "../pages/Dashboard/D-MainContaint/Membership/AddMembership";
import Membership from "../pages/Dashboard/D-MainContaint/Membership/Membership";
import AllUsers from "../pages/Dashboard/D-MainContaint/Users/AllUsers";
import SearchUser from "../pages/Dashboard/D-MainContaint/Users/SearchUser";
import SearchBook from "../pages/Dashboard/D-MainContaint/Book/SearchBook";
import UpdateBook from "../pages/Dashboard/D-MainContaint/Book/updateBook";
import UserInfo from "../pages/Dashboard/D-MainContaint/Users/UserInfo";

import AllBooks from "../pages/Home/H-MainComponent/Books/AllBooks";
import MyBooks from "../pages/Home/H-MainComponent/Books/MyBooks";
import AllMembership from "../pages/Home/H-MainComponent/Membership/AllMembership";
import MyMembership from "../pages/Home/H-MainComponent/Membership/MyMembership";
import ShowTransations from "../pages/Home/H-MainComponent/Transations/ShowTransations";
import EditUser from "../pages/Home/H-MainComponent/User/EditUser";
import NewTransation from "../pages/Home/H-MainComponent/Transations/NewTransation.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "/",
                element: <Home/>,
                children:[
                   {
                    path:"",
                    element:<Welcome/>
                   },
                   {
                    path: "allBooks",
                    element : <AllBooks/>
                   },
                   {
                    path:"myBooks",
                    element:<MyBooks/>
                   },
                   {
                    path:"allMembership",
                    element:<AllMembership/>
                   },
                   {
                    path:"myMembership",
                    element:<MyMembership/>
                   },
                   {
                    path:"showTransations",
                    element:<ShowTransations/>
                   },
                   {
                    path:"newTransation",
                    element: <NewTransation/>
                   },
                   {
                    path:"editUser",
                    element:<EditUser/>
                   }
                ]
            },
            {
                path:"/dashboard",
                element: <Dashboard/>,
                children:[
                    {
                        path:"",
                        element:<Welcome/>
                    },
                    {
                        path:"editAdmit",
                        element:<EditAdmin/>
                    },
                    {
                        path:"addBook",
                        element:<AddBook/>
                    },
                    {
                        path:"searchBook",
                        element:<SearchBook/>
                    },
                    {
                        path:"updateBook",
                        element:<UpdateBook/>
                    },
                    {
                        path:"viewBook",
                        element:<ViewBook/>
                    },
                    {
                        path:"addMembership",
                        element: <AddMembership/>
                    },
                    {
                        path:"Membership",
                        element:<Membership/>
                    },
                    {
                        path:"allUsers",
                        element:<AllUsers/>
                    },
                    {
                        path:"searchUser",  
                        element: <SearchUser/>
                    },
                    {
                        path:"userInfo",
                        element:<UserInfo/>
                    }
                ]
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/loginUser",
                element: <UserLogin/>,
            },
            {
                path: "/loginAdmin",
                element: <AdminLogin/>,
            }
        ]
    }
]);

export default router;