import React from "react";
import AlertContext from "./AlertContext";
import { toast } from "react-toastify";

const AlertState = ({ children }) => {
  const toast_config = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const handleAlertStatus = (aStatus) => {
    if (aStatus.type === "success")
      toast.success(aStatus.message, toast_config);
    else if (aStatus.type === "error")
      toast.error(aStatus.message, toast_config);
    else if (aStatus.type === "warn") toast.warn(aStatus.message, toast_config);
    else if (aStatus.type === "info") toast.info(aStatus.message, toast_config);
    else toast(aStatus.message, toast_config);
  };

  return (
    <AlertContext.Provider
      value={{
        handleAlertStatus,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
