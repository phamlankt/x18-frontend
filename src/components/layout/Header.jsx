import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import authAPI from "../../apis/authAPI";

function Header() {
  const [myInfor, setMyInFor] = useState({});
  const [stopFecthAPI, setStopFectAPI] = useState(false);
  const { auth } = useContext(AuthContext);
  const myTokenToCheck = localStorage.getItem("access_toen");

  if (!stopFecthAPI) {
    setStopFectAPI(true);
    authAPI
      .authInfo()
      .then((response) => {
        setMyInFor(response.data.data.userInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="Header">
      <div className="menu">
        <h3 className="logo">{`<LOGO>`}</h3>
        <Link
          to="/"
          className="menuIcon"
          style={{ display: "flex", alignItems: "center" }}
        >
          Jobs
        </Link>
        <button className="menuIcon">
          {myInfor.roleName === "applicant" ? "Applicant" : "Recruiter"}
        </button>
      </div>
      <div className="navbar">
        {auth.isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BellRing size={35} color="white" />
            <Link
              to="/profile"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={
                  myInfor.avatarUrl
                    ? myInfor.avatarUrl
                    : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                }
                alt=""
              />
              <h4>{myInfor.fullName}</h4>
            </Link>
            <Link className="navIconLogin" to="/login">
              Log out
            </Link>
          </div> /// add avatar dropdown
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
