import React from "react";

function Header() {
  return (
    <div className="Header">
      <div className="menu">
        <h3 className="logo">{`<LOGO>`}</h3>
        <button className="menuIcon">Jobs</button>
        <button className="menuIcon">bla</button>
        <button className="menuIcon">bla</button>
      </div>
      <div className="navbar">
        <button className="navIconLogin">Login</button>
        <button className="navIconRegister">Register</button>
      </div>
    </div>
  );
}

export default Header;
