import type React from "react";
import './navbar.css'
import logo from '../../assets/images/logo1.jpg';
import { Profileinfo } from "../cards/profileinfo"
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../utils/user.types";
import SearchBar from "../input/SearchBar";

interface NavbarProps {
  userinfo: IUser | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userinfo,
  searchQuery,
  setSearchQuery,
  onSearch,
  onClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="navbar">
      <img src={logo} alt="logo" />

      {isToken && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={onSearch} // Updated prop name to handleSearch
            onClearSearch={onClearSearch}
          />
          <Profileinfo userinfo={userinfo} onLogout={onLogout} />
        </>
      )}
    </div>
  )
}
