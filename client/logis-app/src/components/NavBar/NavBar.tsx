import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") ?? "";

  return (
    <>
      <div className=" flex p-5 justify-between  bg-black text-white text-center text-2xl fixed top-0 left-0 right-0">
        <button
          className="px-4 py-2"
          onClick={() => {
            navigate("/");
          }}
        >
          Tusla
        </button>

        {userId ? (
          <nav className="px-4 py-2 hidden md:flex gap-6">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
            <a href="#" className="hover:text-gray-400">
              About
            </a>
            <a href="/logins" className="hover:text-gray-400">
              Services
            </a>
            <a href="/logins/admin" className="hover:text-gray-400">
              Admin
            </a>
            <a href="/chatbots" className="hover:text-gray-400">
              Ai Chat
            </a>
            <Button
              className="hover:text-gray-400"
              onClick={() => {
                localStorage.removeItem("userId");
                navigate("/");
              }}
            >
              Log Out
            </Button>
          </nav>
        ) : (
          <a href="/logins" className="hover:text-gray-400">
            Login
          </a>
        )}

        <button
          className="md:hidden px-4 py-2 text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-2 bg-blue-500 text-white p-4 fixed top-16 left-0 right-0">
          <a href="/" className="hover:text-gray-400 hover:underline">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="/logins" className="hover:text-gray-400">
            Services
          </a>
          <a href="/logins/admin" className="hover:text-gray-400">
            Admin
          </a>
          <a href="/chatbots" className="hover:text-gray-400">
            Ai Chat
          </a>
        </div>
      )}
    </>
  );
};

export default NavBar;
