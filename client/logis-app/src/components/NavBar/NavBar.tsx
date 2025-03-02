import { useState } from "react";




export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      // A desktop navigation menu (<nav>) that is hidden by default (hidden) but visible on medium-sized screens (md:flex).
      // A hamburger menu button (☰) for mobile, which is hidden on medium screens (md:hidden). 
      // when large screen hidden will be overrite by md:flex  and making visible


      <>
      <div className=" flex p-5 justify-between  bg-black text-white text-center text-2xl rounded-lg fixed top-0 left-0 right-0">
      <p className="px-4 py-2">Tailwind is working! 🎉</p>

  
        <nav className="px-4 py-2 hidden md:flex gap-6">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="/logins" className="hover:text-gray-400">Services</a>
          <a href="/logins/admin" className="hover:text-gray-400">Admin </a>
        </nav>

              {/* Mobile Menu Button */}
              <button 
                    className="md:hidden px-4 py-2 text-xl" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
                <div className="md:hidden flex flex-col gap-2 bg-black text-white p-4 fixed top-16 left-0 right-0">
                    <a href="/" className="hover:text-gray-400">Home</a>
                    <a href="#" className="hover:text-gray-400">About</a>
                    <a href="/logins" className="hover:text-gray-400">Services</a>
                    <a href="/logins/admin" className="hover:text-gray-400">Admin</a>
                </div>
            )}

      
      </>

    )
}