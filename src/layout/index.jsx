import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
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
