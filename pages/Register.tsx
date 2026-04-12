import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSaveUser } from "../hooks/useSaveUser";
import {
  registerSchema,
  type RegisterFormData,
} from "../validators/registerValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSetLoggedIn } from "../hooks/useSetLoggedIn";

export default function Register() {
  const Navigate = useNavigate();
  const { setLoggedIn } = useSetLoggedIn();

  const { saveUser } = useSaveUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      role: "student",
    },
    resolver: zodResolver(registerSchema),
  });

  const onsubmit: SubmitHandler<RegisterFormData> = (data) => {
    setLoggedIn()
    saveUser(data);
    Navigate("/");
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:min-h-[calc(100vh-68px)] sm:px-6 sm:py-14 md:px-8 lg:px-20 lg:py-20"
    >
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
            <label className="text-sm font-semibold text-[#0A033C]">
              Full name
            </label>
            <input
              {...register("fullName")}
              placeholder="John Doe"
              autoComplete="name"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
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
            <label className="text-sm font-semibold text-[#0A033C]">Role</label>
            <select
              {...register("role")}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Confirm password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter password"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
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
