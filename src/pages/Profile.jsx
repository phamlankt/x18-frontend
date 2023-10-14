import { useContext, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ProfileComponent from "../components/profile/ProfileComponent";
import ResetPasswordModal from "../components/profile/ResetPasswordModal";
import AlertContext from "../contexts/AlertContext/AlertContext";

const Profile = () => {
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const { handleAlertStatus } = useContext(AlertContext);
  const notify = () =>
    handleAlertStatus({ type: "error", message: "Error!" });
  return (
    <>
      {/* <button onClick={notify}>Notify !</button> */}
      <Header />
      <ProfileComponent
        onOpenResetPasswordModal={() => setResetPasswordModalOpen(true)}
      />
      <ResetPasswordModal
        show={resetPasswordModalOpen}
        handleClose={() => setResetPasswordModalOpen(false)}
      />
      <Footer />
    </>
  );
};

export default Profile;
