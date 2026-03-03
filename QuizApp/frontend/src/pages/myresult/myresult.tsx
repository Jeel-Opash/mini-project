import React from "react";
import './myresult.css';
import { Navbar } from "../../component/navbar/navbar";
import { Result } from "../../component/result/result";

export const Myresult: React.FC = () => {
    return(
       <div><Navbar/>
       <Result/>
       </div>
    )
}