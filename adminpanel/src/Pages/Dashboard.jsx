import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Home } from "./Home"

export const Dashboard = () => {
    return (
        <>
            <Home />
          
            <main className="main-content">
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}