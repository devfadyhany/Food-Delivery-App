import React, { useContext } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <AdminNavbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
