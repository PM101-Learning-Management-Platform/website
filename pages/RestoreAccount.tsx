import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../api/auth";
import SuccessMessage from "../components/SuccessMessage";

export default function RestoreAccount() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Verification Code, 3: Success
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { RestoreAccount, VerifyRestoreCode } = Auth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await RestoreAccount({ email });
      setStep(2);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error?.response?.data?.message || "Failed to send verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await VerifyRestoreCode({ email, code: verificationCode });
      setStep(3);
      
      // Redirect to login after successful restoration
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error?.response?.data?.message || "Invalid verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 && "Restore Account"}
            {step === 2 && "Verify Code"}
            {step === 3 && "Account Restored"}
          </h2>
          <p className="text-gray-600">
            {step === 1 && "Enter your email to receive a restoration code"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Your account has been successfully restored"}
          </p>
        </div>

        {step === 3 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <SuccessMessage message="Account restored successfully! Redirecting to login..." />
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={() => setError("")} 
              className=" text-sm font-medium mt-2 p-2 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
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
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Restoration Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-500 text-center">
                Enter the 6-digit code sent to {email}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verifying..." : "Verify & Restore"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleEmailSubmit}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                disabled={isSubmitting}
              >
                Didn't receive code? Resend
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-700 mb-4">
              Your account has been successfully restored. You can now log in with your credentials.
            </p>
            <Link
              to="/login"
              className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Go to Login
            </Link>
          </div>
        )}

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
