import React,{ useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Landing from './pages/Landing.jsx'
import axios from 'axios';
import ProtectedRoute from './components/protectedRoute.jsx';
import Res from './pages/Res.jsx';
import Appointments from './pages/Appointments.jsx';
import Prescriptions from './pages/Prescriptions.jsx';
import Thanks_appointment from './pages/Thanks_appointment.jsx';
import Appointment_his from './pages/Appointment_his.jsx';


const App = () => {
  


  return (
    <>
      <Router>
        <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/signin" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/thanks_appointment" element={<Thanks_appointment/>} />
              <Route path="/appointment_history" element={<Appointment_his/>} />
              <Route path="/results" element={ <ProtectedRoute><Res/></ProtectedRoute> } />
              <Route path="/appointments" element={ <ProtectedRoute><Appointments/></ProtectedRoute> } />
              <Route path="/prescriptions" element={ <ProtectedRoute><Prescriptions/></ProtectedRoute> } />
          </Routes>      
          </Router>


    </>
  )
}

export default App
