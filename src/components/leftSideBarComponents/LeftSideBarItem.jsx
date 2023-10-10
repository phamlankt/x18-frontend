import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../contexts/AppContext/AppContext";

function LeftSideBarItem({ item }) {
  const { leftSideBarSelectedItem, handleLeftSideBarSelectedItem } =
    useContext(AppContext);
  return (
    <li className={leftSideBarSelectedItem === item.id ? "mm-active" : ""}>
      <NavLink
        to={item.path}
        className="nav-link"
        onClick={(e) => {
          handleLeftSideBarSelectedItem(item.id);
        }}
      >
        <i className="ti-control-record" />
        {item.text}
      </NavLink>
    </li>
  );
}

export default LeftSideBarItem;
