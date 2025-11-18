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


const App = () => {
  


  return (
    <>
      <Router>
        <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/signin" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/results" element={ <ProtectedRoute><Res/></ProtectedRoute> } />
              <Route path="/appointments" element={ <ProtectedRoute><Appointments/></ProtectedRoute> } />
              <Route path="/prescriptions" element={ <ProtectedRoute><Prescriptions/></ProtectedRoute> } />
          </Routes>      
          </Router>


    </>
  )
}

export default App
