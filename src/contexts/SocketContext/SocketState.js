import React, { useState } from "react";
import SocketContext from "./SocketContext";

const SocketState = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const handleSocket = (sk) => {
    setSocket(sk);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        handleSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketState;
