import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CoursesPage from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Contact from "../pages/Contact";
import PageNotFound from "../pages/PageNotFound";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyCode from "../pages/VerifyCode";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const App = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <ScrollToTop />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-70 w-70 rounded-full bg-[#7c5cff]/15 blur-3xl sm:h-100 sm:w-100 md:h-130 md:w-130" />
        <div className="absolute -right-20 top-16 h-80 w-80 rounded-full bg-[#fb6d56]/12 blur-3xl sm:right-0 sm:h-100 sm:w-100 md:top-24 md:h-155 md:w-155" />
      </div>
      <Navbar />
      <main className="relative z-0 w-full flex-1 pt-15 sm:pt-17">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
