import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHome } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-white flex flex-col justify-center items-center px-4">
      <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center">
        {/* Logo/Brand Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
              Tusla
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-pink-100 opacity-90">
            Your E-commrce Website Choice
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white/10 rounded-2xl p-8 w-full max-w-lg border border-white/20 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <FaHome className="text-white text-2xl mr-3" />
            <h2 className="text-2xl md:text-3xl font-semibold">Welcome to Tusla</h2>
          </div>
          
          <Link to="/logins" className="block w-full">
            <Button 
              className="w-full py-6 text-lg font-medium rounded-xl bg-black hover:scale-105 flex items-center justify-center gap-3 shadow-lg border-0"
            >
              <span>Sign In to Your Account</span>
              <FaArrowRight />
            </Button>
          </Link>
          
          <div className="mt-6 text-sm text-center text-pink-200">
            <Link to="/register" className="underline hover:text-white">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;