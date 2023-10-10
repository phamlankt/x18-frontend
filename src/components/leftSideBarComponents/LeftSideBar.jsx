import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import AppContext from "../../contexts/AppContext/AppContext";
import leftNavBarItems from "../../global/leftNavBarItems";
import LeftSideBarItem from "./LeftSideBarItem";
const LeftSideBar = () => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;
  const { handleLeftSideBarSelectedItem, leftSideBarOpen } =
    useContext(AppContext);
  useEffect(() => {
    auth.user.role_id === 1 && handleLeftSideBarSelectedItem(6);
  }, []);
  return (
    isAuthenticated &&
    leftSideBarOpen && (
      <div className="left-sidenav mm-active">
        <ul className="metismenu left-sidenav-menu mm-show">
          {leftNavBarItems.map((item) => {
            return item.adminOnly
              ? user.role_id === 1 && (
                  <LeftSideBarItem key={item.id} item={item} />
                )
              : user.role_id !== 1 && (
                  <LeftSideBarItem key={item.id} item={item} />
                );
          })}
        </ul>
      </div>
    )
  );
};

export default LeftSideBar;
