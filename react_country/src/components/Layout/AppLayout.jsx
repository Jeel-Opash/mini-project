import { Outlet } from "react-router-dom"
import { Footer } from "../UI/Footer"
import { Headers } from "../UI/Header"

export const AppLayout=()=>{
    return(
        <>
        <Headers/>
        <Outlet/>
        <Footer/>
        </>
    )
}