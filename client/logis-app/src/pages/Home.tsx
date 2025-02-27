
import React from "react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"
import { FaRegArrowAltCircleRight } from "react-icons/fa";



const Home: React.FC = () => {
    // Flex
    // justify center , start, end (horizontal)
    // item start center end (vertical)
    // min-h-screen = reach full of screen
    // bg primary background color
    // text-primary-foreground = text match color theme

    //mt margin top mb margin bottom
    
    //text center start end

    //flex flex-col = flex vertically normal = hori
    // ml mr move left and right or use space-x-6 between element

    
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary text-primary-foreground" >
       <p className="text-8xl mb-40">#TARGET</p>
       <p className="text-4xl font-bold mb-6">🏠 Welcome to Home Page</p>
       <p className="text-lg mb-6">This is the main landing page of the website.</p>  
        <div className="flex items-center space-x-2">

        <p className="text-4xl" >Click Here To Login</p>

        <Link to="/logins">
        <Button variant="ghost" size="icon" className="text-black w-10 h-10 hover:bg-red-500 flex items-center justify-center hover:text-white">
        <FaRegArrowAltCircleRight className="scale-150" />
        </Button>
        </Link>
        </div>
    </div>
    </>
  );
};

export default Home;
