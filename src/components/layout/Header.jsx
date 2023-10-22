import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";
import AuthContext from "../../contexts/AuthContext/AuthContext";

function Header() {
  const { auth } = useContext(AuthContext);
  return (
    <div className="Header">
      <div className="menu">
        <h3 className="logo">{`<LOGO>`}</h3>
        <button className="menuIcon">Jobs</button>
        <button className="menuIcon">{true ? "Applicant" : "Recruiter"}</button>
      </div>
      <div className="navbar">
        {auth.isAuthenticated ? (
          <>
            <BellRing size={35} color="white" />
            <img
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt=""
            />
            <h4>Name</h4>
          </> /// add avatar dropdown
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
