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
import TransactionRecord from "../pages/Admin/TransactionRecord";
import StudentDetails from "../pages/Admin/StudentDetails";
import AdminError from "../pages/shared/AdminError";
import BookDetailsAdmin from "../pages/Admin/BookDetailsAdmin";
import DeshboardHead from "../components/Admin/DeshboardHead"

import {
  Grid, 
  Users,
  ClipboardList,
  Calendar,
  ShieldCheck,
  Search,
  FileText,
  Settings,
  LogOut,
  UserCircle,
  Sun,
  Moon,
} from "lucide-react";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import HelpSupport from "../context/HelpSupport";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
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
        element: <Error />,
      },
      {
        path: "/helpsupport",
        element: <HelpSupport />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />,
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: <LoginAdmin />,
      }
    ],
  } ,
  {
    path: "/admin",
    element: <RootAdmin />,
    errorElement: <AdminError />,
    children: [
      {
        path: "/admin/home",
        element: (
          <PrivateRouteAdmin>
            <HomeAdmin />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/admin/students",
        element:
        (
          <PrivateRouteAdmin>
            <StudentTable />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/admin/books",
        element: (
          <PrivateRouteAdmin>
            < BookTable />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/admin/transaction-records",
        element: (
          <PrivateRouteAdmin>
            < TransactionRecord />
          </PrivateRouteAdmin>
        ),
        
      },
      {
        path: "/admin/students/info/:profile_id",
        element: (
          <PrivateRouteAdmin>
            <StudentDetails />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/admin/books/info/:book_id",
        element:(
          <PrivateRouteAdmin>
            <BookDetailsAdmin />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/admin/reservations",
        element: <DeshboardHead icon={Calendar} heading="Reservations" subheading="No Available here any data ..."/> 
      },
      {
        path: "/admin/management",
        element: <DeshboardHead icon={ShieldCheck} heading="Management" subheading="No Available here any data ..."/> 
      },
      {
        path: "/admin/reports",
        element: <DeshboardHead icon={FileText} heading="Reports" subheading="No Available here any data ..."/> 
      },
      {
        path: "/admin/settings",
        element: <DeshboardHead icon={Settings} heading="Settings" subheading="No Available here any data ..."/> 
      },
    ],
  },
]);

export default router;
