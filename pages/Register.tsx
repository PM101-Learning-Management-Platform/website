import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Auth } from "../api/auth";
import {
  registerSchema,
  type RegisterFormData,
} from "../validators/registerValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessMessage from "../components/SuccessMessage";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";

export default function Register() {
  const { Register } = Auth();

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const onsubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await Register({
        ...data,
        date_of_birth: new Date(data.date_of_birth).toISOString()
      });
      setShowSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong, please try again.");
  }
    }
  };

  if(error) {
    return <ErrorMessage message={error} />
  }

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:min-h-[calc(100vh-68px)] sm:px-6 sm:py-14 md:px-8 lg:px-20 lg:py-20"
    >
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <SuccessMessage message="Please check your email to verify your account." />
        </div>
      )}
      <div className="w-full max-w-md rounded-3xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_80px_-30px_rgba(124,92,255,0.35)] backdrop-blur-sm sm:p-8">
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-[#5D5A6F]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#7c5cff] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">Name</label>
            <input
              {...register("name")}
              placeholder="John Doe"
              autoComplete="name"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Date of birth
            </label>
            <input
              type="date"
              {...register("date_of_birth")}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
            {errors.date_of_birth && (
              <p className="text-red-500">{errors.date_of_birth.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Gender
            </label>
            <select
              {...register("gender")}
              autoComplete="gender"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-sm font-semibold text-[#0A033C]">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
                type={showPassword ? "text" : "password"}
              />
              <div
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8b8aa1]"
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter password"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8b8aa1]"
              >
                {showConfirmPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity"
          >
            Create account
          </button>

          <p className="text-center text-xs text-[#5D5A6F]">
            By continuing, you agree to our terms and privacy policy.
          </p>
        </div>
      </div>
    </form>
  );
}
