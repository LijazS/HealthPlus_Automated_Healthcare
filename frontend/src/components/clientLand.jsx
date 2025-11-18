import React from 'react';
import { useState,useEffect } from  'react';
import { useNavigate } from 'react-router-dom';



const ClientLand = () => {

  const navigate = useNavigate();

    return (
       <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-20">
  {/* Top Section */}
  <div  className="w-full h-[40vh]  pt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch justify-stretch px-10 ">

    <div onClick={() => navigate("/appointments")} className="rounded bg-gray-300 dark:bg-gray-700 h-[50vh ] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/pexels-shvetsa-3786119.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105"
  />
  <div className="relative z-10 flex items-center justify-center h-full text-black text-5xl font-bold text-center cursor-pointer  transition-all animate:pulse hover:scale-105 hover:text-bold duration-300">
    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-anton font-extrabold  text-black drop-shadow-[0_0_14px_rgba(59,130,246,0.45)]">
      Appointment<br></br> Scheduling</h1>
  </div>
    </div>

    <div onClick={() => navigate("/results")} className="rounded bg-gray-300 dark:bg-gray-700 h-[50vh ] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/pexels-pixabay-40568.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105"
  />
  <div className="relative z-10 flex items-center justify-center h-full text-black text-5xl font-bold text-center cursor-pointer transition-all animate:pulse hover:scale-105 hover:text-bold duration-300">
    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-anton font-extrabold  text-black drop-shadow-[0_0_14px_rgba(59,130,246,0.45)]">Results</h1>
  </div>
    </div>

    <div onClick={() => navigate("/prescriptions")} className="rounded bg-gray-300 dark:bg-gray-700 h-[50vh ] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer">
      <img
    src="/assets/pexels-pixabay-208512.jpg" // replace with your JPEG path
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105"
  />
  <div className="relative z-10 flex items-center justify-center h-full text-black text-5xl font-bold text-center cursor-pointer transition-all animate:pulse hover:scale-105 hover:text-bold duration-300">
    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-anton font-extrabold  text-black drop-shadow-[0_0_14px_rgba(59,130,246,0.45)]">Prescriptions</h1>
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

   <div className="w-full h-[40vh] pt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch justify-stretch px-10">
    <div className="rounded bg-gray-300 dark:bg-gray-700 h-full"></div>
    <div className="rounded bg-gray-300 dark:bg-gray-700 h-full"></div>
    <div className="rounded bg-gray-300 dark:bg-gray-700 h-full"></div>
  </div>

</div>
    );

}

export default ClientLand;