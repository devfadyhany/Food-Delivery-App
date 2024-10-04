import React from "react";
import "./AdminNavbar.css";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div>
        <h1 className="logo">Food Delivery.</h1>
        <p>Admin Panel</p>
      </div>
      <Link
        to="/"
        style={{
          backgroundColor: "tomato",
          color: "white",
          padding: "10px 15px",
        }}
      >
        User Application
      </Link>
    </div>
  );
};

export default AdminNavbar;
