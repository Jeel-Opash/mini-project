import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Password } from "../../component/input/password";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured, Please try again.");
      }
    }
  };




  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h4 className="logintitle">
            Capture Your <br /> Journeys
          </h4>

          <p className="loginpara">
            Record your travel experiences and memories in your personal travel journal.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <h4 className="form-title">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Password
              value={password}
              onChanges={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            {error && <p className="error-message">{error}</p>}



            <button type="submit" className="btn-primary">
              LOGIN
            </button>

            <p className="divider">Or</p>

            <button
              type="button"
              className="create-btn"
              onClick={() => navigate("/signup")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>


    </div>
  );
};