import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const  auth  = useSelector((store) => store.auth);
  console.log(auth.token)

  
  
  if (!auth.token) {
  
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;