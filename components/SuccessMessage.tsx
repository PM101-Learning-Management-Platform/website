import { Link } from "react-router-dom";
import checked from "../src/assets/images/checked.gif";

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3">
        <img src={checked} alt="checked" className="w-20 h-20" />
        <p className="text-black font-semibold">{message}</p>
        <Link to="/login" className="text-blue-500">
          Go to login page
        </Link>
      </div>
    </div>
  );
}
