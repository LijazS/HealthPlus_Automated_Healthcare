import React from 'react';
import { useState,useEffect } from  'react';
import { useNavigate } from 'react-router-dom';



const ClientLand = () => {

  const navigate = useNavigate();

    return (
      <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-20">
  {/* Top Section */}
  <div className="w-full h-screen pt-10 px-10 overflow-auto">
  <div  className="w-full pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch px-10">
    <div onClick={() => navigate("/appointments")} className="rounded bg-gray-300 dark:bg-gray-700 h-64 sm:h-80 md:h-96 lg:h-[50vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/pexels-shvetsa-3786119.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105 z-0"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
  <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
    <h1 style={{textShadow: '0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)'}} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-black ">
      Appointment<br></br> Scheduling</h1>
  </div>
    </div>

    <div onClick={() => navigate("/results")} className="rounded bg-gray-300 dark:bg-gray-700 h-64 sm:h-80 md:h-96 lg:h-[50vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/pexels-pixabay-40568.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105 z-0"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
  <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
    <h1 style={{textShadow: '0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)'}} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-black ">Results</h1>
  </div>
    </div>

    <div onClick={() => navigate("/prescriptions")} className="rounded bg-gray-300 dark:bg-gray-700 h-64 sm:h-80 md:h-96 lg:h-[50vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/pexels-pixabay-208512.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105 z-0"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
  <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
    <h1 style={{textShadow: '0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)'}} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-black ">Prescriptions</h1>
  </div>
    </div>

  </div>

  {/* Divider with title */}
  <div className="flex items-center justify-center w-full mt-10">
    <span className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></span>
    <span className="shrink-0 px-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
      zzzzzzzz
    </span>
    <span className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></span>
  </div>

  <div className="w-full pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch px-10">

    <div onClick={() => navigate("/appointment_history")} className="rounded bg-gray-300 dark:bg-gray-700 h-64 sm:h-80 md:h-96 lg:h-[50vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/5851.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter scale-105 z-0"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
  <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
    <h1 style={{textShadow: '0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)'}} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-black ">Appointment<br></br>History/Status</h1>
  </div>
    </div>

    <div className="rounded bg-gray-300 dark:bg-gray-700 h-64 sm:h-80 md:h-96 lg:h-[50vh]"></div>
    <div className="rounded bg-gray-300 dark:bg-gray-700 h-64 sm:h-80 md:h-96 lg:h-[50vh]"></div>


  </div>
  </div>

</div>
    );

}

export default ClientLand;