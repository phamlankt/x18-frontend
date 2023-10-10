import React, { useContext } from "react";
import NavBar from "./NavBar";
import AuthContext from "../../contexts/AuthContext/AuthContext";

export const logo =
  "https://drive.google.com/uc?export=view&id=1kvFDWul0NlJiF4Pc5fCGAdMqXhWWkUPY";

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    auth.isAuthenticated && (
      <div className="topbar">
        <NavBar />
      </div>
    )
  );
};

export default Header;
