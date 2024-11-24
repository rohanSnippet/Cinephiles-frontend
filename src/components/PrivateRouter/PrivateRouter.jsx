import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const location = useLocation();
  const navigate = useNavigate();
  if (!username) {
    navigate("/login");
  }
  if (username) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
