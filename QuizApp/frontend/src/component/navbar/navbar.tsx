import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiAward } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
import { BiSolidLogIn } from "react-icons/bi";
import "./navbar.css";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleAuthChange = () => {
      const updatedToken = localStorage.getItem("token");
      setLoggedIn(!!updatedToken);
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.dispatchEvent(
        new CustomEvent("authChanged", { detail: { user: null } })
      );
    } catch (error) {
      console.error("Failed to dispatch auth change event:", error);
    }
    setLoggedIn(false);
    setMenuOpen(false);
    try {
      navigate("/login");
    } catch (error) {
      console.error("Navigation failed:", error);
      window.location.href = "/login";
    }
  };

  return (
    <nav className="mainnavbar">
      <div className="navbarsize">
        <Link to="/" className="Imginside">
          <img
            src="https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"
            alt="logooffwebsite"
          />
        </Link>
      </div>

      <div className="hexagone">
        <h2 className="hexagonesiz">Hexagon Quiz Application</h2>
      </div>

      <div className="awardadd">
        <NavLink to="/result" className="resultnavlink">
          <FiAward />
          My Result
        </NavLink>

        {loggedIn ? (<button className="logoutbtn" onClick={handleLogout}>
            Logout
          </button>
        ) : (<NavLink to="/login" className="resultloginnavlink">
            Login</NavLink>
        )}

        <div className="menuicon">
          <button
            onClick={() => setMenuOpen((s) => !s)}className="menuiconsize">
            {menuOpen ? <MdOutlineMenu /> : <BiSolidLogIn />}</button>

          {menuOpen && (
            <div className="mobileMenuPanel">
              <ul className="mobileMenuList">
                <li>
                  <NavLink to="/result" className="mobileMenuItem"
                    onClick={() => setMenuOpen(false)}>
                    <FiAward />
                    My Result
                  </NavLink>
                </li>
                {loggedIn ? (
                  <li>
                    <button className="mobileMenuItem logoutmobile"
                      onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login" className="mobileMenuItem"
                      onClick={() => setMenuOpen(false)}>
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};