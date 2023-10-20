import { useState } from "react";

import ProfileComponent from "../components/profile/ProfileComponent";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import MasterLayout from "../components/layout/MasterLayout";

const Profile = () => {
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  return (
    <>
      <MasterLayout
        ContentComponent={
          <ProfileComponent
            onOpenResetPasswordModal={() => setResetPasswordModalOpen(true)}
          />
        }
        hasSideBar={false}
        hasFooter={true}
      />

      <ChangePasswordModal
        show={resetPasswordModalOpen}
        handleClose={() => setResetPasswordModalOpen(false)}
      />
    </>
  );
};

export default Profile;
