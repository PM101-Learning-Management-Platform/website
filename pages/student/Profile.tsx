import { useEffect, useState } from "react";
import {
  UpdateUserProfile,
  deleteMyAccount,
  ChangeUserPassword,
} from "../../api/user";
import { updateUser } from "../../lib/setToken";
import ErrorMessage from "../../components/ErrorMessage";
import { EyeClosed, Eye } from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw) as {
        id?: string;
        name?: string;
        fullName?: string;
        email?: string;
        role?: string;
        date_of_birth?: string;
        gender?: string;
        created_at?: string;
        avatar?: string;
      };
    } catch {
      return null;
    }
  })();

  const displayName = user?.fullName ?? user?.name ?? "Student";
  const email = user?.email ?? "student@example.com";
  const UserId = user?.id ?? "";
  const created_at = user?.created_at ?? "";
  console.log(user);

  const handelUpdateUserProfile = async () => {
    UpdateUserProfile(UserId, {
      name,
      date_of_birth,
    });
    updateUser({
      id: UserId,
      name,
      date_of_birth,
    });
    setShowSuccess(true);
    setError("");
  };

  const handleChangeUserPassword = async () => {
    ChangeUserPassword(UserId, {
      oldPassword,
      newPassword: newPassword,
    });
    setShowSuccess(true);
    setError("");
  };

  const handleDeleteAccount = async () => {
    deleteMyAccount(UserId);
    setShowSuccess(true);
    setError("");
  };

  const handelShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handelShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
        setError("");
        window.location.reload();
      }, 3000);
    }
  }, [showSuccess]);

  if (showSuccess)
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-2">
          <p className="text-green-500">Profile updated successfully</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-[#fb6d56] text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto w-full max-w-5xl gap-6 flex flex-col mb-8">
      <header className="flex flex-col bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-black/5 shadow-sm gap-2 mt-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#fb6d56]">Profile</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A033C] sm:text-3xl">
            {displayName}
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#5D5A6F]">
            Update your personal info and see your account details.
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm shadow-sm backdrop-blur-sm">
          <p className="font-semibold text-[#0A033C]">{email}</p>
          <p className="text-xs font-semibold text-[#5D5A6F]">
            {user?.role ? `Role: ${user.role}` : "Role: student"}
          </p>
          {user?.gender && (
            <p className="text-xs font-semibold text-[#5D5A6F]">
              Gender: {user.gender}
            </p>
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handelUpdateUserProfile}
          className="lg:col-span-2 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
        >
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Personal information
          </h2>
          <p className="mt-1 text-sm text-[#5D5A6F]">
            You can update your profile information here.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0A033C]">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={displayName}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0A033C]">
                Email
              </label>
              <input
                defaultValue={email}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/10 bg-gray-100 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)] cursor-not-allowed"
                disabled={true}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-[#0A033C]">
                Date of birth
              </label>
              <input
                type="date"
                value={user?.date_of_birth?.split("T")[0]}
                onChange={(e) => setDate_of_birth(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A033C] shadow-sm transition hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Save changes
            </button>
          </div>
        </form>

        <aside className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Account
          </h2>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-black/5 bg-white/60 p-4">
              <p className="text-sm font-bold text-[#0A033C]">Member since</p>
              <p className="mt-1 text-sm text-[#5D5A6F]">
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white/60 p-4">
              <p className="text-sm font-bold text-[#0A033C]">Learning goal</p>
              <p className="mt-1 text-sm text-[#5D5A6F]">
                Complete 1 course per month
              </p>
            </div>
          </div>
        </aside>

        {/* Change Password - 2/3 width */}
        <form
          onSubmit={handleChangeUserPassword}
          className="lg:col-span-2 flex flex-col gap-4 bg-white p-6 rounded-2xl border border-black/5 shadow-sm backdrop-blur-sm"
        >
          <h2 className="text-base font-semibold text-[#0A033C]">
            Change password
          </h2>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              Old password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm text-[#111] outline-none focus:border-[#fb6d56]/40 focus:shadow-[0_0_0_4px_rgba(251,109,86,0.12)]"
              />
              <button
                type="button"
                onClick={handelShowOldPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D5A6F] hover:text-[#0A033C] transition-colors duration-150"
              >
                {showOldPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#0A033C]">
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm text-[#111] outline-none focus:border-[#fb6d56]/40 focus:shadow-[0_0_0_4px_rgba(251,109,86,0.12)]"
              />
              <button
                type="button"
                onClick={handelShowNewPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D5A6F] hover:text-[#0A033C] transition-colors duration-150"
              >
                {showNewPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#fb6d56] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e05a44] transition-colors duration-150"
            >
              Update password
            </button>
          </div>
        </form>

        {/* Delete Account - 1/3 width */}
        <div className="lg:col-span-1 flex flex-col gap-3 bg-white p-6 rounded-2xl border border-black/5 shadow-sm backdrop-blur-sm">
          <h2 className="text-base font-semibold text-[#0A033C]">
            Delete account
          </h2>
          <p className="text-sm text-[#5D5A6F] flex-1">
            Permanently delete your account and all of your content. This action
            cannot be undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="inline-flex items-center justify-center rounded-xl bg-[#fb6d56] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e05a44] transition-colors duration-150"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
