import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { HiEyeOff } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginResponse {
  token?: string;
  user?: Record<string, unknown>;
  message?: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const API_BASE = "http://localhost:5000";

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Invalid email format";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      const payload = { email, password };
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: LoginResponse | null = null;
      try {
        data = await res.json();
      } catch (parseError) {
        console.warn("Failed to parse login response as JSON:", parseError);
      }

      if (!res.ok) {
        const msg = data?.message || "Login failed";
        setSubmitError(msg);
        return;
      }

      if (data?.token) {
        try {
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user || { email })
          );
        } catch (e) {
          console.error("Storage error:", e);
        }

        const user = data.user || { email };
        window.dispatchEvent(
          new CustomEvent("authChanged", { detail: { user } })
        );

        navigate("/", { replace: true });
      } else {
        setSubmitError("Invalid server response");
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="mainlogin">
        <Link to="/" className="backhome">
          <FaArrowLeftLong />
          <span className="homelogin">Home</span>
        </Link>

        <div className="formcreations">
          <form onSubmit={handleSubmit} className="mainform" noValidate>
            <h2>
              <FiLogIn />
            </h2>

            <p className="detaillogin">
              Sign in to continue to Hexagon Quiz. Light, clean UI with smooth
              micro animations and easy validation.
            </p>

            <label className="loginlabel">
              <span>Email</span>
              <div className="inputmailicon">
                <span className="mailicon">
                  <CiMail />
                </span>
                <input type="email" name="email" value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder="your@example.com"/>
              </div>
              {errors.email && (
                <small className="error">{errors.email}</small>
              )}
            </label>

            <label className="loginlabel">
              <span>Password</span>
              <div className="inputmailicon">
                <input type={showPassword ? "text" : "password"}
                  name="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  placeholder="Enter your password"/>
                <button type="button" className="passworsseeornot"
                  onClick={() => setShowPassword((s) => !s)}>
                  {showPassword ? <FaEye /> : <HiEyeOff />}
                </button>
              </div>
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
            </label>

            {submitError && (
              <div className="submiterror">{submitError}</div>
            )}
    
            <button type="submit" className="loginbtn" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="signupinlogin">
              <span className="signinlogin">
                Don't have an account?{" "}
                <Link to="/signup">Create Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};