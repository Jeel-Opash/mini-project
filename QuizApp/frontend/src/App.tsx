import { Navigate, Route, Routes,useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Home } from './pages/home/home'
import { Login } from './component/login/login'
import { Register } from './component/register/register'
import { Myresult } from './pages/myresult/myresult'



function RequireAuth({children}: {children: ReactNode}){
  const isLoggedIn = Boolean(localStorage.getItem("token"))
  const location =useLocation();

if(!isLoggedIn){
  return <Navigate to="/login" state={{from:location}} replace />
}
return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
       <Route path="/signup" element={<Register/>} />


       <Route path='/result' element={<RequireAuth><Myresult/></RequireAuth>}/>
    </Routes>
  )
}

export default App
