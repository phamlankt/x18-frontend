import React, { useContext, useState } from "react";
import AppContext from "./AppContext";

const AppState = ({ children }) => {
  const [leftSideBarOpen, setLeftSideBarOpen] = useState(
    window.location.pathname === "/" ? false : true
  );

  const [leftSideBarSelectedItem, setLeftSideBarSelectedItem] = useState(1);

  const handleLeftSideBarStatus = (select) => {
    setLeftSideBarOpen(select);
  };
  const handleLeftSideBarSelectedItem = (select) => {
    setLeftSideBarSelectedItem(select);
  };

  return (
    <AppContext.Provider
      value={{
        leftSideBarOpen,
        handleLeftSideBarStatus,
        leftSideBarSelectedItem,
        handleLeftSideBarSelectedItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
