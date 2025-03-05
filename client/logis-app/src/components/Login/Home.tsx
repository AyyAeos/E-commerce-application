
import React from "react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

// sm md lg xl

const Home: React.FC = () => {
  
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary text-primary-foreground" >
        <div>
          <p className="text-4xl md:text-6xl lg:text-8xl mb-40 text-center">John Commerce</p>
          <p className="text-4xl font-bold mb-6 text-center">🏠 Welcome to John Commerce</p>
            <div className="flex justify-center items-center gap-2">

            <p className="text-4xl text-center" >Click Here To Login</p>

            <Link to="/logins">
            <Button variant="ghost" size="icon" className="text-black w-10 h-10 hover:bg-red-500 flex items-center justify-center hover:text-white">
            <FaRegArrowAltCircleRight className="scale-150" />
            </Button>
            </Link>
            </div>
        </div>
    </div>
    </>
  );
};

export default Home;
