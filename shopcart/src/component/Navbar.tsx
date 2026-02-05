import { NavLink } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6";
import "./Navbar.css"
export function Navbar(){
    return(
        <section className="header">
          <nav className="main">
                    <ul>
                    <li className="tab"><NavLink to="/">Home</NavLink></li>
                    <li className="tab"><NavLink to="/about">About</NavLink></li>
                    <li className="tab"><NavLink to="/store">Store</NavLink></li>
                    
                    </ul>
                </nav>
               <button className="btn"><FaCartShopping/></button>
                </section>
        
    )
}