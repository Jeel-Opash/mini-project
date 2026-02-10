import { useState } from "react"
import { MdLegendToggle } from "react-icons/md";
import '../style/Sidebar.css';
import { NavLink } from "react-router-dom";


export const Home=()=>{
    const[isopen,setisopen]=useState(false);
    const togglesidebar=()=>{
        setisopen(!isopen);
    }

    return(
<div className={`sidebar ${isopen ? 'open' : 'closed'}`}>

    <button  onClick={togglesidebar} className="toggle-btn"><MdLegendToggle /></button>
   

    {isopen &&  (<nav className="menu">
                <ul>
                 <li><NavLink className="path" to="/">About</NavLink></li>
                 <li><NavLink className="path"  to="/user">User</NavLink></li>
                <li><NavLink className="path" to="/setting">Setting</NavLink></li>
                     
                </ul>
            </nav>
    )}
      </div>
    )
}