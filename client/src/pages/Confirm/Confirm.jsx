import React, { useEffect, useState } from "react";
import "./Confirm.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/API";
import { toast } from "react-toastify";

const Confirm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const ConfirmEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/user/confirm`, {
        token: token,
      });

      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      toast.error(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ConfirmEmail();
  }, []);

  return <div style={{ marginTop: "100px" }}>{loading && "Loading..."}</div>;
};

export default Confirm;
