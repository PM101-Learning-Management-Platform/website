import { useEffect } from "react";
import SuccessMessage from "../components/SuccessMessage";
import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <SuccessMessage message="Email Verified. You will be redirected to login page in a few seconds." />
    </div>
  );
}
