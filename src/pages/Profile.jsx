import { useState } from "react";

import ProfileComponent from "../components/profile/ProfileComponent";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import MasterLayout from "../components/layout/MasterLayout";
import AuthContext from "../contexts/AuthContext/AuthContext";
import { useContext } from "react";
import AdminMasterLayout from "../components/layout/AdminMasterLayout";

const Profile = () => {
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  return (
    <>
      {auth.user.roleName === "admin" || auth.user.roleName === "superadmin" ? (
        <AdminMasterLayout
          ContentComponent={
            <ProfileComponent
              onOpenResetPasswordModal={() => setResetPasswordModalOpen(true)}
            />
          }
        />
      ) : (
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
      )}
    </>
  );
};

export default Profile;
