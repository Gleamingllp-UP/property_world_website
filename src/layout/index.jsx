import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createVisitorsThunk } from "../features/user/userSlice";

function Layout() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem("visitTracked");
    if (!alreadyTracked) {
      dispatch(createVisitorsThunk());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full  text-gray-800">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="overflow">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
