import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <div>
      <Navbar />
      <main className="relative z-0 w-full flex-1 pt-15 sm:pt-17">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
