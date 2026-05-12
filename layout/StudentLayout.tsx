import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function StudentLayout() {
  return (
    <div>
      <Sidebar />
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
