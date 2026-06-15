import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LearningPath from "./LearningPath";

export default function StudentLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
        <LearningPath />
      </div>
      <main className="relative w-full max-w-7xl mx-auto flex-1 px-4 mt-28">
        <Outlet />
      </main>
    </>
  );
}
