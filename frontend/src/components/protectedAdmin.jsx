import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedAdmin;
