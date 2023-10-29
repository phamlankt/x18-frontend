import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      className="job-form-container container-sm d-flex justify-content-center align-items-center"
      style={{
        width: "1000px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <Spinner animation="border" variant="info" />
    </div>
  );
};

export default Loading;
