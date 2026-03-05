import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./Home/home"
import { Login } from "./Auth/login"
import { Signup } from "./Auth/signup"

function App() {


  return (
   <div>
    <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
  </div>
  
  )
}

export default App
