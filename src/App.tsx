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
import { useSaveUser } from "../hooks/useSaveUser";
import { useState } from "react";

const App = () => {
  const { getUser } = useSaveUser();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getUser());
  console.log(isLoggedIn);
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <ScrollToTop />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[280px] w-[280px] rounded-full bg-[#7c5cff]/15 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[520px] md:w-[520px]" />
        <div className="absolute -right-20 top-16 h-[320px] w-[320px] rounded-full bg-[#fb6d56]/12 blur-3xl sm:right-0 sm:h-[480px] sm:w-[480px] md:top-24 md:h-[620px] md:w-[620px]" />
      </div>
      <Navbar />
      <main className="relative z-0 w-full flex-1 pt-[60px] sm:pt-[68px]">
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)}/>} />
          <Route path="/register" element={<Register />} />
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
