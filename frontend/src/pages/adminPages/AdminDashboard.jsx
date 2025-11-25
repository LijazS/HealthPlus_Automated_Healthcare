import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from '../../components/headerAdmin.jsx';


const AdminDashboard = () => {

    const navigate = useNavigate();

    return (
        <>
        < AdminHeader />

        <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-20">
         <div className="w-full h-screen pt-10 px-10 overflow-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">

    <div
      onClick={() => navigate("/appointments")}
      className="rounded bg-gray-300 dark:bg-gray-400 h-64 sm:h-80 md:h-96 lg:h-[60vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
      <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
        <h1
          style={{
            textShadow:
              "0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)",
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-white "
        >
          Appointment
          <br />
          Handling
        </h1>
      </div>
    </div>

    <div
      onClick={() => navigate("/results")}
      className="rounded bg-gray-300 dark:bg-gray-400 h-64 sm:h-80 md:h-96 lg:h-[60vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
      <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
        <h1
          style={{
            textShadow:
              "0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)",
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-white "
        >
          Result Management
        </h1>
      </div>
    </div>

    <div
      onClick={() => navigate("/prescriptions")}
      className="rounded bg-gray-100 dark:bg-gray-400 h-64 sm:h-80 md:h-96 lg:h-[60vh] relative overflow-hidden transition-all hover:brightness-70 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/70 z-10"></div>
      <div className="relative z-20 flex items-center justify-center h-full text-center transition-all animate:pulse hover:scale-105 duration-300 px-4">
        <h1
          style={{
            textShadow:
              "0 0 14px rgba(59,130,246,0.45), 0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.6)",
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-anton font-extrabold text-white "
        >
          Prescription Management
        </h1>
      </div>
    </div>
  </div>
</div>
</div>

    </>
    );
}

export default AdminDashboard;