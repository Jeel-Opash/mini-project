import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/home'
import { Login } from './component/login/login'
import { Register } from './component/register/register'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
       <Route path="/signup" element={<Register/>} />
    </Routes>
  )
}

export default App
