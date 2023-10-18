import React from "react";

function Header() {
  return (
    <div className="Header">
      <div className="menu">
        <img
          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
          alt=""
          className="logo"
        />
        <button className="menuIcon">Jobs</button>
      </div>
      <div className="navbar">
        <button className="navIconLogin">Login</button>
        <button className="navIconRegister">Register</button>
      </div>
    </div>
  );
}

export default Header;
