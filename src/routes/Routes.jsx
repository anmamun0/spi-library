import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Book from "../pages/Book";
import BookDetails from "../pages/BookDetails";
import Test from "../pages/Test";
import AuthRedirect from "../components/AuthRedirect";
import Profile from "../pages/Profile";
import RootAdmin from "../layout/RootAdmin"; 
import Pannel from "../components/Admin/Pannel";

import HomeAdmin from "../pages/Admin/HomeAdmin";
import LoginAdmin from "../pages/Admin/LoginAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/book',
        element: <Book />,
      },
      {
        path: '/bookdetails',
        element: <BookDetails />,
      },
      {
        path: '/auth-redirect',
        element: <AuthRedirect />,
      },
      {
        path: '/profile',
        element: <Profile />,
      }
    ]
  },
  {
    path: '/admin',
    element: <RootAdmin />,
    errorElement: 'Error',
    children: [ 
      {
        path: '/admin',
        element: <LoginAdmin/>
      },
      {
        path: "/admin/home",
        element: <HomeAdmin/>
      }, 
    ]
  }

  
]);

export default router;
