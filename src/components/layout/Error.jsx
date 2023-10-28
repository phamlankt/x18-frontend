import React from "react";

const Error = ({ error }) => {
  return (
    <div
      className="job-form-container container-sm d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <h5 className="text-danger text-center">
        {error || "Something went wrong"}
      </h5>
    </div>
  );
};

export default Error;
