import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Home } from "./Home"
import { About } from "./About"

export const Dashboard = () => {
    return (
        <>
            <Home />
           <About/>
            <main className="main-content">
                <Outlet />
            </main>
        </>
    )
}