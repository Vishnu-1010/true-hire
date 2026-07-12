import React,{useState} from 'react'
import { Briefcase, Menu, Dot, X, BadgeCheck } from "lucide-react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="relative mx-6 my-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-extrabold text-2xl text-gray-900 tracking-tight cursor-pointer hover:opacity-90 transition-opacity">
            <Briefcase className="w-7 h-7 text-blue-700" />
            <span className="font-mono font-bolder text-3xl tracking-wide">
              TrueHire
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 font-medium text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Find Jobs
            </a>
            <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Log in
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-semibold">
              Sign up
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-100 rounded-xl shadow-xl flex flex-col gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 sm:hidden">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium py-1"
            >
              Find Jobs
            </a>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-2.5">
              <button className="w-full text-center py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Log in
              </button>
              <button className="w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar

