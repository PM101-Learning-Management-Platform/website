import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import checked from "../src/assets/images/checked.gif";

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
      <div className="bg-white w-50% h-auto rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3">
        <img src={checked} alt="checked" className="w-20 h-20" />
        <p className="text-black font-semibold text-center">{message}</p>

        <Link
          to="/login"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Go to Login Page
        </Link>
      </div>
    </div>
  );
}
