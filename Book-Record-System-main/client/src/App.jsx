import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/admin/Home";
import UserHome from "./components/User/Home";
import AddBook from "./components/admin/AddBooks";
import EditBooks from "./components/admin/EditBooks";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import RoleProtectedRoute from "./components/ProtectedRoutes/RoleProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Admin Layout */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <Home />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/addbook"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AddBook />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/editbook/:id"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <EditBooks />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <RoleProtectedRoute allowedRoles={["user"]}>
            <UserHome />
          </RoleProtectedRoute>
        }
      />
      
    </Routes>
  );
}

export default App;
