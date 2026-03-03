import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { HiEyeOff } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const isValidEmail = (email: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

interface FormErrors {
	name?: string;
	email?: string;
	password?: string;
	confirm?: string;
}

export const Register: React.FC = () => {
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirm, setConfirm] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string>("");

	const API_BASE = "http://localhost:5000";

	const validate = (): FormErrors => {
		const e: FormErrors = {};
		if (!name) e.name = "Name is required";
		if (!email) e.email = "Email is required";
		else if (!isValidEmail(email)) e.email = "Invalid email format";
		if (!password) e.password = "Password is required";
		if (!confirm) e.confirm = "Please confirm password";
		else if (password && confirm && password !== confirm)
			e.confirm = "Passwords do not match";
		return e;
	};

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setSubmitError("");
		const validation = validate();
		setErrors(validation);
		if (Object.keys(validation).length) return;

		setLoading(true);
		try {
			const payload = { name, email, password };
			const res = await fetch(`${API_BASE}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			let data:
				| { token?: string; user?: Record<string, unknown>; message?: string }
				| null = null;
			try {
				data = await res.json();
			} catch (err) {
				console.warn("Failed to parse register response:", err);
			}

			if (!res.ok) {
				setSubmitError(data?.message || "Registration failed");
				return;
			}
			navigate("/login", { replace: true });
		} catch (error) {
			console.error("Register error:", error);
			setSubmitError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register">
			<div className="mainregister">
				<Link to="/" className="backhome">
					<FaArrowLeftLong />
					<span className="homelogin">Home</span>
				</Link>

				<div className="formcreations">
					<form onSubmit={handleSubmit} className="mainform" noValidate>
						<h2><FiUserPlus /></h2>

						<p className="detaillogin">Create a new account to start taking quizzes.</p>

						<label className="loginlabel">
							<span>Name</span>
							<div className="inputmailicon">
						<input type="text" name="name" value={name}
						onChange={(e) => {setName(e.target.value);
						if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
									}}
									placeholder="Your full name"/>
							</div>
							{errors.name && <small className="error">{errors.name}</small>}
						</label>

						<label className="loginlabel">
							<span>Email</span>
							<div className="inputmailicon">
								<span className="mailicon">
									<CiMail />
								</span>
								<input type="email" name="email" value={email}
									onChange={(e) => { setEmail(e.target.value);
										if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
									}}
									placeholder="your@example.com"/>
							</div>
							{errors.email && <small className="error">{errors.email}</small>}
						</label>

						<label className="loginlabel">
							<span>Password</span>
							<div className="inputmailicon">
					<input type={showPassword ? "text" : "password"} name="password"
					value={password} onChange={(e) => {setPassword(e.target.value);
										if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
									}}
									placeholder="Enter your password"/>
								<button type="button" className="passworsseeornot"
									onClick={() => setShowPassword((s) => !s)}>
									{showPassword ? <FaEye /> : <HiEyeOff />}
								</button>
							</div>
							{errors.password && <small className="error">{errors.password}</small>}
						</label>

						<label className="loginlabel">
							<span>Confirm Password</span>
							<div className="inputmailicon">
								<input type={showPassword ? "text" : "password"}
								 name="confirm" value={confirm} 
									onChange={(e) => {
										setConfirm(e.target.value);
										if (errors.confirm) setErrors((p) => ({ ...p, confirm: undefined }));
									}}
									placeholder="Re-enter your password"/>
							</div>
							{errors.confirm && <small className="error">{errors.confirm}</small>}
						</label>

						{submitError && <div className="submiterror">{submitError}</div>}

						<button type="submit" className="loginbtn" disabled={loading}>
							{loading ? "Creating account..." : "Create Account"}
						</button>

						<div className="signupinlogin">
							<span className="signinlogin">
								Already have an account? <Link to="/login">Sign in</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
