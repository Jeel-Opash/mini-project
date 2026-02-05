import { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../style/Login.css';

export const Login=()=>{
    const[user,setuser]=useState('');
    const[password,setpassword]=useState('');
    const[error,seterror]=useState(false);
    const[Loading,setLoading]=useState();
    const navigate=useNavigate();

const handleSubmit=(e)=> {
    e.preventDefault()
    setLoading(true)
    if (user === "jeel402" && password === "Jeel!@#123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      seterror(true);
      setLoading(false);
    }
  };

   return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label className="label">Username :</label>
        <input className="users"
          type="text"  required value={user} disabled={Loading}
          onChange={(e) => setuser(e.target.value)} />

        <label  className="label">Password :</label>
        <input className="users"
          type="password" required value={password} disabled={Loading}
          onChange={(e) => setpassword(e.target.value)}/>

        {error && (<p style={{ color: "red" }}>Invalid username or password</p>
        )}

        <button type="submit" className="btn">
          {Loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};