import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../api/auth";
import SuccessMessage from "../components/SuccessMessage";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { ForgotPassword } = Auth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ForgotPassword({ email })
      .then(() => {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/reset-password");
        }, 3000);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            {isSubmitted
              ? "We've sent a verification code to your email"
              : "Enter your email to receive a verification code"}
          </p>
        </div>

        {isSubmitted && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setIsSubmitted(false)}
          >
            <SuccessMessage message="Verification code sent! Please check your inbox.\nPlease wait, you will be redirected in a few seconds." />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fb6d56] text-white py-3 rounded-lg font-semibold"
          >
            Send Verification Code
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-700 font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
