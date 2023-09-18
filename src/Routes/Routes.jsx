import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminDashbord, Login, UserDashbord } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<UserDashbord />} />
      <Route path="/admin" element={<AdminDashbord />} />
    </Routes>
  );
};
export default AppRoutes;
