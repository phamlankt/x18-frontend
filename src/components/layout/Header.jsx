import React from "react";
import { useContext, useState, useEffect } from "react";
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
import Notifications from "../notification/Notifications";
import notificationAPI from "../../apis/notificationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { handleApplicationNotification } from "../../global/common";
import { toast } from "react-toastify";
import NotificationContext from "../../contexts/NotificationContext/NotificationContext";
function Header() {
  const { handleAlertStatus } = useContext(AlertContext);
  const {notifications,handleNotification}=useContext(NotificationContext)
  const [myData, setMyInFor] = useRecoilState(Recoil.AtomDataUser);
  const [stopFecthAPI, setStopFectAPI] = useRecoilState(
    Recoil.AtomCheckDataUser
  );
  const { auth, handleLogout, socket } = useContext(AuthContext);
  const myInfor = auth.user;
  const navigate = useNavigate();
  const activeClass = (params) => {
    return params.isActive ? "menuIcon active-item" : "menuIcon";
  };

  useEffect(() => {
    auth.isAuthenticated && fetchNotification();
  }, []);
  const fetchNotification = async () => {
    try {
      await notificationAPI.getByReceiver().then((result) => {
        handleNotification(result.data.data.notificationList);
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
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
  // const addNoti = () => {
  //   const newNoti = (
  //     <button className="settings">abc has been applied for new job</button>
  //   );
  //   setNotifications((prev) => [...prev, newNoti]);
  // };
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
          style={{
            display: myInfor.roleName === "admin" ? "flex" : "none",
            alignItems: "center",
          }}
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
        {/* <button onClick={addNoti}>Add notification</button> */}
        {auth.isAuthenticated ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {notifications.length > 0 ? (
              <Dropdown
                // open={true}
                overlay={
                  <Menu className="menu">
                    <div>
                      <p className="notification-title m-0">
                        Your notifications:
                      </p>
                      <Notifications
                        // notifications={notifications}
                        // setNotifications={setNotifications}
                      />
                    </div>
                  </Menu>
                }
              >
                <div className="notification-container">
                  <BellRing color="white" />
                  <span className="notification">{notifications.length}</span>
                </div>
              </Dropdown>
            ) : (
              <BellRing color="white" />
            )}

            <Dropdown overlay={menu}>
              <div>
                <img
                  src={
                    myInfor.avatarUrl
                      ? myInfor.avatarUrl
                      : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  }
                  alt=""
                />
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
