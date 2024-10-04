import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, hash } = location;
  const { currentUser, UpdateUser } = useContext(AuthContext);
  const { GetTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <a href="/#header">
        <h1 className="logo">Food Delivery.</h1>
      </a>
      <ul className="navbar-menu">
        <li
          className={
            (pathname === "/" && hash === "") || hash === "#header"
              ? "active"
              : ""
          }
        >
          <Link to="/#header">home</Link>
        </li>
        <li className={hash === "#menu" ? "active" : ""}>
          <a href="/#menu">menu</a>
        </li>
        <li className={hash === "#app-download" ? "active" : ""}>
          <a href="/#app-download">mobile-app</a>
        </li>
        <li className={hash === "#footer" ? "active" : ""}>
          <a href="/#footer">contact us</a>
        </li>
      </ul>
      <div className="navbar-right">
        {currentUser && (
          <div className="navbar-basket-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="basket-icon" />
            </Link>
            <div className={GetTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        )}
        {currentUser ? (
          <>
            <img
              onClick={() => navigate("/my-orders")}
              className="cursor"
              src={assets.profile_icon}
              alt=""
            />
            <button onClick={() => UpdateUser(null)}>Logout</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
