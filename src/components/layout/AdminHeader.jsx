import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import adminavatar from "../../images/adminavatar.jpg";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Dropdown, Menu } from "antd";
import { BellRing, LogOut, User2 } from "lucide-react";
const styleBtn = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "none",
  background: "white",
  color: "rgba(0, 33, 64, 0.8)",
  cursor: "pointer",
  borderRadius: 6,
};

const AdminHeader = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const myInfor = auth.user;
  const navigate = useNavigate();

  const DeleteToken = () => {
    handleLogout();
    localStorage.removeItem("accessToken");
  };

  const menu = (
    <Menu className="admin-master-layout-account">
      <button style={styleBtn} onClick={() => navigate("/profile")}>
        <User2 /> Profile
      </button>
      <button
        style={{ ...styleBtn, color: "red" }}
        onClick={() => DeleteToken()}
      >
        <LogOut /> Log Out
      </button>
    </Menu>
  );
  return (
    <div className="Header" style={{ backgroundColor: "rgba(0, 33, 64, 0.8)" }}>
      <div className="menu">
        <NavLink to="/admin" className="logo">
          <img src={logo} alt="logo" />
          <span>JOBSTAR</span>
        </NavLink>
      </div>
      <div className="navbar">
        {auth.isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Dropdown overlay={menu}>
              <div>
                <img
                  src={myInfor.avatarUrl ? myInfor.avatarUrl : adminavatar}
                  alt=""
                />
              </div>
            </Dropdown>
          </div>
        ) : (
          navigate("/login")
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
