import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = ({ children }) => {
  const [previousPage, setPreviousPage] = useState("");

  const handlePreviousPage = (prePage) => {
    setPreviousPage(prePage);
  };
  return (
    <AppContext.Provider
      value={{
        previousPage,
        handlePreviousPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
