import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./Pages/Login"
import { Dashboard } from "./Pages/Dashboard"
import { User } from "./Pages/User"
import { About } from "./Pages/About"
import { Setting } from "./Pages/Setting"
export const App=()=>{
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Dashboard/>}>
        <Route path="user" element={<User/>} />
        <Route path="/" element={<About/>}/>
        <Route path="setting" element={<Setting/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}