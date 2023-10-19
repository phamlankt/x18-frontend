import { useState } from "react";

import ProfileComponent from "../components/profile/ProfileComponent";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import Header from "../components/layout/Header";
import { Footer } from "antd/es/layout/layout";

const Profile = () => {
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  return (
    <>
      <Header />
      <ProfileComponent
        onOpenResetPasswordModal={() => setResetPasswordModalOpen(true)}
      />
      <ChangePasswordModal
        show={resetPasswordModalOpen}
        handleClose={() => setResetPasswordModalOpen(false)}
      />
      <Footer />
    </>
  );
};

export default Profile;
