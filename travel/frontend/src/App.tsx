import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom"
import { Home } from "./pages/Home/home"
import { Login } from "./pages/login/login"
import { Signup } from "./pages/signup/signup";

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
