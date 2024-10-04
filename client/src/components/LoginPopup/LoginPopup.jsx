import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { API_BASE_URL } from "../../constants/API";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const LoginPopup = ({ setShowLogin }) => {
  const { UpdateUser } = useContext(AuthContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const ChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(`${API_BASE_URL}/user/register`, {
          username: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/user/login`, {
          email: data.email,
          password: data.password,
        });

        UpdateUser(response.data.data);
        document.cookie = "token=" + JSON.stringify(response.data.token);
      }

      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
      setShowLogin(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={SubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross-icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              type="text"
              value={data.name}
              onChange={ChangeHandler}
              placeholder="Enter your name..."
              required
            />
          )}
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={ChangeHandler}
            placeholder="Enter your e-mail..."
            required
          />
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={ChangeHandler}
            placeholder="Enter your password..."
            required
          />
        </div>
        <button disabled={loading}>
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {currentState === "Sign Up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
