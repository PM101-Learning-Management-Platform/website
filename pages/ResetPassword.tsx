import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import SuccessMessage from "../components/SuccessMessage";
import { Auth } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { ResetPassword } = Auth();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    ResetPassword({
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }).catch((err) => {
      setError(err.message);
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
    }
    handleResetPassword(e);
    <SuccessMessage message="Password reset successful\n Please log in with your new password." />;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
              <div
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8b8aa1]"
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </div>
              <p className="text-xs text-gray-600">Minimum 6 characters</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8b8aa1]"
              >
                {showConfirmPassword ? (
                  <EyeClosed size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </div>
            </div>
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  Passwords do not match
                </p>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
