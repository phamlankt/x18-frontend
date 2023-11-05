import UserManagementComponent from "../components/userManagement/userManagamentComponent";
import MasterLayout from "../components/layout/MasterLayout";
import "../scss/_userManagement.scss"
const UserManagement = () => {
  return (
    <>
    <MasterLayout
        ContentComponent={
          <UserManagementComponent/>
        }
        hasSideBar={false}
        hasFooter={true}
      />
    </>
  );
}

export default UserManagement;
