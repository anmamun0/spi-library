import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Book from "../pages/Book";
import BookDetails from "../pages/BookDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '/',
        element:(<Home/>),
      },
     {
        path: '/login',
        element:(<Login/>),
      },
     {
        path: '/register',
        element:(<Register/>),
      },
      {
        path: '/book',
        element:(<Book/>),
      },
       {
        path: '/bookdetails',
        element:(<BookDetails/>),
     }
    ]
  },
]);

export default router;
