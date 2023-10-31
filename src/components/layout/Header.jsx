import React from "react";
import { useContext } from "react";
import { Dropdown, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";
import { useRecoilState } from "recoil";
import { LogOut } from "lucide-react";
import { User2 } from "lucide-react";
import Recoil from "../../recoilContextProvider";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import authAPI from "../../apis/authAPI";
import logo from "../../images/logo.png";

function Header() {
  const [myData, setMyInFor] = useRecoilState(Recoil.AtomDataUser);
  const [stopFecthAPI, setStopFectAPI] = useRecoilState(
    Recoil.AtomCheckDataUser
  );
  const { auth, handleLogout } = useContext(AuthContext);
  const myInfor = auth.user;
  const navigate = useNavigate();
  const activeClass = (params) => {
    return params.isActive ? "menuIcon active-item" : "menuIcon";
  };

  const DeleteToken = () => {
    navigate("/login");
    handleLogout();
    localStorage.removeItem("accessToken");
  };

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
        <NavLink to="/" className="logo">
          <img src={logo} alt="logo" />
          <span>JOBSTAR</span>
        </NavLink>
        <NavLink
          to="/"
          className={activeClass}
          style={{ display: "flex", alignItems: "center" }}
        >
          Jobs
        </NavLink>
        <NavLink
          to="/admin/userManagement" // The path to the user management page
          className={activeClass}
          style={{ display: myInfor.roleName === "admin" ? "flex" : "none", alignItems: "center" }}
          >
          Users
        </NavLink>
        <NavLink
          to={myInfor.roleName === "applicant" ? "/myListJob" : "/myPost"}
          className={activeClass}
          style={{ display: "flex", alignItems: "center" }}
        >
          {myInfor.roleName === "applicant" ? "Applicant" : ""}
          {myInfor.roleName === "recruiter" ? "Recruiter" : ""}
        </NavLink>
      </div>
      <div className="navbar">
        {auth.isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BellRing size={32} color="white" />

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
