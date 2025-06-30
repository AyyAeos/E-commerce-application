import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axiosInstance from "@/utils/axiosInstance";

export const NavBar = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logins/logout");
      setIsLogin(false); // update login state
      navigate("/logins");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex p-5 justify-between bg-black text-white text-2xl fixed top-0 left-0 right-0">
      <button
        className="px-4 py-2"
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Tusla
      </button>

      <nav className="px-4 py-2 hidden md:flex gap-6">
        <a href="/" className="hover:text-gray-400">
          Home
        </a>
        <a href="#" className="hover:text-gray-400">
          About
        </a>
        <a href="/products" className="hover:text-gray-400">
          Services
        </a>
        <a href="/logins/admin" className="hover:text-gray-400">
          Admin
        </a>
        <a href="/chatbots" className="hover:text-gray-400">
          Ai Chat
        </a>
        {isLogin ? (
          <Button className="hover:text-gray-400" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button className="hover:text-gray-400" onClick={() => navigate("/logins")}>
            Login
          </Button>
        )}
      </nav>
    </div>
  );
};

export default NavBar;