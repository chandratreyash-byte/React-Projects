import React,{ useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/Api";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    API.get("/auth/me")
      .then(() => setStatus("authorized"))
      .catch(() => setStatus("unauthorized"));
  }, []);

  if (status === "loading") return <p>Checking auth...</p>;
  if (status === "unauthorized") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
