import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Auth } from "../api/auth";
import {
  registerSchema,
  type RegisterFormData,
} from "../validators/registerValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessMessage from "../components/SuccessMessage";
import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";

export default function Register() {
  const { Register } = Auth();

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

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
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1949 }, (_, i) =>
    String(currentYear - i),
  );

  useEffect(() => {
    if (day && month && year) {
      setValue("date_of_birth", `${year}-${month}-${day}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [day, month, year, setValue]);

  const onsubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await Register({
        ...data,
        date_of_birth: new Date(data.date_of_birth).toISOString(),
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

  if (error) {
    return <ErrorMessage message={error} />;
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

            <div className="grid grid-cols-3 gap-3">
              {/* Day */}
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40"
              >
                <option value="">Day</option>

                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40"
              >
                <option value="">Month</option>

                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40"
              >
                <option value="">Year</option>

                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <input type="hidden" {...register("date_of_birth")} />

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

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Password
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />

              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8aa1]"
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
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
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />

              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8aa1]"
              >
                {showConfirmPassword ? (
                  <EyeClosed size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
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
