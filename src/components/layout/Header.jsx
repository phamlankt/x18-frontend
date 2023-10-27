import React from "react";
import { useContext, useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Settings } from "lucide-react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LogOut } from "lucide-react";
import { User2 } from "lucide-react";
import Recoil from "../../recoilContextProvider";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import AuthState from "../../contexts/AuthContext/AuthState";
import authAPI from "../../apis/authAPI";

function Header() {
  const [myData, setMyInFor] = useRecoilState(Recoil.AtomDataUser);
  const [stopFecthAPI, setStopFectAPI] = useRecoilState(
    Recoil.AtomCheckDataUser
  );
  const { auth, handleLogout } = useContext(AuthContext);
  const myInfor = auth.user;
  const navigate = useNavigate();

  const DeleteToken = () => {
    navigate("/login");
    handleLogout();
    localStorage.removeItem("accessToken");
  };

  console.log(auth);

  if (!stopFecthAPI) {
    setStopFectAPI(true);
    authAPI
      .authInfo()
      .then((response) => {
        setMyInFor(response.data.data.userInfo);
        console.log(response.data.data.userInfo, 29);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleMenuClick = (e) => {
    console.log("Clicked: ", e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="menu">
      <Link to="/profile" className="profileMenu">
        <img src={myInfor.avatarUrl} alt="" className="avatarProfileMenu" />
        <h5 className="fullNameProfileMenu">
          {myInfor.roleName === "applicant"
            ? myInfor.fullName
            : myInfor.companyName}
        </h5>
      </Link>
      <button className="settings" onClick={() => navigate("/profile")}>
        <User2 /> Profile
      </button>
      <button className="logout" onClick={() => DeleteToken()}>
        <LogOut /> Log Out
      </button>
    </Menu>
  );

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
        <Link
          to={myInfor.roleName === "applicant" ? "/myListJob" : "/myPost"}
          className="menuIcon"
          style={{ display: "flex", alignItems: "center" }}
        >
          {myInfor.roleName === "applicant" ? "Applicant" : ""}
          {myInfor.roleName === "recruiter" ? "Recruiter" : ""}
        </Link>
      </div>
      <div className="navbar">
        {auth.isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BellRing size={35} color="white" />

            <Dropdown overlay={menu}>
              <div>
                <img src={myInfor.avatarUrl} alt="" />
              </div>
            </Dropdown>
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
