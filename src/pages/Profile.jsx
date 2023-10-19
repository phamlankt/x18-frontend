import { useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ProfileComponent from "../components/profile/ProfileComponent";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";

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
