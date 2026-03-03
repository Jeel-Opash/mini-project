import React from "react";
import { Navbar } from "../../component/navbar/navbar";
import { Sidebar } from "../../component/sidebar/sidebar";

export const Home: React.FC = () => {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
    </div>
  );
}   