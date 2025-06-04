import { Outlet } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pannel from "../components/Admin/Pannel";

function RootAdmin() {
  return (
      <>
          <Pannel>
              <Outlet />
          </Pannel>
      </>
  );
}

export default RootAdmin;
