import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pannel from "../components/Admin/Pannel";
import { LibraryDataProvider } from "../context/Admin/useLibraryData";

function RootAdmin() {
  return (
    <>
      <LibraryDataProvider>
        <Pannel>
          <Outlet />
        </Pannel>
      </LibraryDataProvider>
    </>
  );
}

export default RootAdmin;
