import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <Navbar />
      <main id="inicio" className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
