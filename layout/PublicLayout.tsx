import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LearningPath from "./LearningPath";

export default function PublicLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
        <LearningPath />
      </div>
      <main className="relative mt-25 w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
