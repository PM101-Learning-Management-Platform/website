import { Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import CoursesPage from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Contact from "../pages/Contact";
import PageNotFound from "../pages/PageNotFound";
import StudentLayout from "../layout/StudentLayout";
import Dashboard from "../pages/student/Dashboard";
import MyCourses from "../pages/student/MyCourses";
import Assessment from "../pages/student/Assessment";
import Certificates from "../pages/student/Certificates";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RestoreAccount from "../pages/RestoreAccount";
import SetAuthorized from "../components/setAuthorized";
import SetGuest from "../components/setGuest";
import AuthLayout from "../layout/AuthLayout";

const App = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <ScrollToTop />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-70 w-70 rounded-full bg-[#7c5cff]/15 blur-3xl sm:h-100 sm:w-100 md:h-130 md:w-130" />
        <div className="absolute -right-20 top-16 h-80 w-80 rounded-full bg-[#fb6d56]/12 blur-3xl sm:right-0 sm:h-100 sm:w-100 md:top-24 md:h-155 md:w-155" />
      </div>
      <Routes>
        <Route element={<SetGuest />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="restore-account" element={<RestoreAccount />} />
          </Route>
          
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<Navigate to="/login" replace />} />
            <Route path="register" element={<Navigate to="/register" replace />} />
            <Route path="forgot-password" element={<Navigate to="/forgot-password" replace />} />
            <Route path="reset-password" element={<Navigate to="/reset-password" replace />} />
            <Route path="restore-account" element={<Navigate to="/restore-account" replace />} />
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<SetAuthorized />}>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="student" element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="assessments/:id/take" element={<Assessment />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
