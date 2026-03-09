import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './signup.css'
import { Password } from "../../component/input/password";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!name) {
      setError("Please enter your name .");
      return;
    }
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
      const res = await axiosInstance.post("/api/auth/register", {
        fullName: name,
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
    <div className="Signup-container">
      <div className="Signup-left">
        <div className="Signup-content">
          <h4 className="Signuptitle">
            Join the  <br /> Adventure
          </h4>

          <p className="Signuppara">
            Create an account to start documenting your travels and
            preserving your memories in your personal travel journal.
          </p>

          <form onSubmit={handleSignup} className="Signup-form">
            <h4 className="formsign-title">Signup</h4>

            <input
              type="text"
              placeholder="Full name"
              className="inputsign-box"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="inputsign-box"
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



            <button type="submit" className="btnsign-primary">
              Sign Up
            </button>

            <p className="divider">Or</p>

            <button
              type="button"
              className="createsign-btn"
              onClick={() => navigate("/login")}>
              LOGIN
            </button>
          </form>
        </div>
      </div>


    </div>
  );
};