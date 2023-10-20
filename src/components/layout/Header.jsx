import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

function Header() {
  const { auth } = useContext(AuthContext);
  return (
    <div className="Header">
      <div className="menu">
        <h3 className="logo">{`<LOGO>`}</h3>
        <button className="menuIcon">Jobs</button>
        <button className="menuIcon">bla</button>
        <button className="menuIcon">bla</button>
      </div>
      <div className="navbar">
        {auth.isAuthenticated ? (
          <>logined</> /// add avatar dropdown
        ) : (
          <Link className="navIconLogin" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
