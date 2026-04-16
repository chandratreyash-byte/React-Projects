import React,{ useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/Api";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => {
        if (allowedRoles.includes(res.data.role)) {
          setStatus("authorized");
        } else {
          setStatus("forbidden");
        }
      })
      .catch(() => setStatus("unauthorized"));
  }, []);

  if (status === "loading") return <p>Checking access...</p>;
  if (status !== "authorized") return <Navigate to="/" replace />;

  return children;
};

export default RoleProtectedRoute;
