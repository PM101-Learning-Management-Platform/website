import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function StudentLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="p-6 pt-28">
        <Outlet />
      </main>
    </>
  );
}
