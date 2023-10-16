import React, { useState } from "react";
import ResetPasswordModal from "../components/forgotPassword/ResetPasswordModal";
import Home from "./Home";

function ResetPassword() {
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(true);
  return (
    <div>
      <Home/>
      <ResetPasswordModal
        show={resetPasswordModalOpen}
        handleClose={() => setResetPasswordModalOpen(false)}
      />
    </div>
  );
}

export default ResetPassword;
