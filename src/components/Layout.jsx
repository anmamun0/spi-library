import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className=" bg-green-600 flex flex-col min-h-screen w-full">
      {!hideLayout && <Navbar />}

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}
