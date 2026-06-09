import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema,type loginFormData } from "../validators/loginValidator";
import { Auth } from "../api/auth";
import { setToken, storeUser } from "../lib/setToken";
import { Eye, EyeClosed } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import avatar from "../src/assets/images/avatar.jpg";

export default function Login() {
  const Navigate = useNavigate();
  const { Login } = Auth();

  const [showPassword, setShowPassword] = useState(false);

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth hook must be used within an AuthProvider");
  }
  const { setUser } = context;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: loginFormData) => {
    try {
      const res = await Login(data);

      if (!res) {
        setError("email", { message: res.message });
        return;
      }
      setToken(res.data.accessToken);
      const user = res.data.user;
      storeUser({
        email: user.email,
        name: user.name,
        id: user.id,
        role: user.role,
        avatar: user.avatar || avatar,
      });
      setUser(user);
      Navigate("/");
    } catch {
      setError("email", { message: "Invalid email or password" });
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:min-h-[calc(100vh-68px)] sm:px-6 sm:py-14 md:px-8 lg:px-20 lg:py-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-3xl border border-black/5 bg-white/80 p-6 shadow-[0_20px_80px_-30px_rgba(124,92,255,0.35)] backdrop-blur-sm sm:p-8">
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[#5D5A6F]">
            New here?{" "}
            <Link to="/register" className="font-semibold text-[#7c5cff] hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">Email</label>
            <input
              {...register("email")}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
          </div>

          <div className="relative space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">Password</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm text-[#111] outline-none ring-0 placeholder:text-[#8b8aa1] focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
            />
            <div
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 cursor-pointer text-[#8b8aa1]"
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-center">{errors.email?.message}</p>}

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-[#5D5A6F]">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="font-semibold text-[#fb6d56] hover:underline">
            Reset it
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-[#5D5A6F]">
          Need to restore your account?{" "}
          <Link to="/restore-account" className="font-semibold text-[#fb6d56] hover:underline">
            Restore it
          </Link>
        </p>
      </form>
    </div>
  );
}
