import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import Book from "../pages/Book/Book";
import BookDetails from "../pages/Book/BookDetails";
import Test from "../pages/Test";
import AuthRedirect from "../components/AuthRedirect";
import Profile from "../pages/Profile";
import RootAdmin from "../layout/RootAdmin";
import Pannel from "../components/Admin/Pannel";

import HomeAdmin from "../pages/Admin/HomeAdmin";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import PrivateRoute from "./PrivateRoute";
 
import Error from "../pages/shared/Error";
import StudentTable from "../pages/Admin/StudentTable";
import BookTable from "../pages/Admin/BookTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books",
        element: <Book />,
      },
      {
        path: "/bookdetails/:id/:isbn/:title",
        element: <BookDetails />,
      },
      {
        path: "/auth-redirect",
        element: <AuthRedirect />,
      },
      {
        path: "/error",
        element: <Error/>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />,
          </PrivateRoute>
        ),
      } 
    ],
  },
  {
    path: "/",
    children: [ 
      {
        path: "/admin",
        element: <LoginAdmin/>,
      },
    ]
  },
  {
    path: "/admin",
    element: <RootAdmin />,
    errorElement: "Error",
    children: [ 
      {
        path: "/admin/home",
        element: <HomeAdmin />,
      },
      {
        path: "/admin/students",
        element: <StudentTable />,
      },
      {
        path: "/admin/books",
        element: <BookTable />,
      },
    ],
  },
]);

export default router;
