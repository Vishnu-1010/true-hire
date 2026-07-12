import React from 'react'
import { Briefcase, Menu, Dot, X, BadgeCheck } from "lucide-react";
const Hero = () => {
  return (
    <div>
      <main className="bg-gradient-to-br from-blue-200 to-white">
        <div className="flex justify-center  mt-2 ">
          <button className="group flex items-center gap-2 px-4 py-1.5 text-md font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 hover:text-gray-900 hover:border-gray-400 transition-all duration-300 ease-in-out shadow-sm mt-[5rem]">
            <BadgeCheck
              className="text-white bg-blue-900 rounded-3xl item-center "
              size={32}
            />
            <span className="font-bold capitalize">verified companies</span>
          </button>
        </div>
        {/* Hero section Tag Line */}
        <div className="mt-[3rem]">
          <div className="flex inline justify-center font-mono ">
            <p className="font-bold capitalize  text-center text-7xl text-pretty tracking-tighter">
              a job portal you can{" "}
            </p>
            <p className=" bg-gradient-to-br from-sky-600 to-purple-600  bg-clip-text text-transparent text-7xl capitalize text-center font-bold">
              actually trust
            </p>
            <div className="container ">
              <p className="text-2xl mt-8 text-gray-700 text-center mx-7 ">
                True Hire lists only verified companies and genuine job
                opportunities. No fake internships, no scam listings — just real
                jobs with full transparency on your application status.
              </p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <button className="capitalize bg-blue-600 mt-5 w-xs text-3xl tracking-tight text-white rounded-2xl text-center font-bold transition delay-200 duration-200 ease-in-out hover:scale-110 hover:translate-y-1 ">
                register free - start applying
              </button>
              <button className="capitalize mt-5 text-2xl font-black hover:outline-1 hover:outline-gray-400 outline-1 outline-gray-50 rounded-xl w-[10rem] h-[3rem] hover:outline-1 hover:outline-gray-300 hover:outline-rounded hover:rounded-xl hover:w-sm/2 hover:h-[3rem] hover:bg-gray-150    ">
                sign in
              </button>
            </div>
            <p className="mt-5 text-2xl mx-5 text-gray-500 pb-7">
              Free for every one who are looking for job.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Hero
