import React, { useState, useEffect, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Button, Input, Select, message } from "antd";
import "../../scss/_userManagement.scss";
import userAPI from "../../apis/userAPI";
import roleAPI from "../../apis/roleAPI";

const { Column } = Table;
const { Option } = Select;

const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCounts, setTotalCounts] = useState(0);
  const [offset, setOffset] = useState(0);
  const [roleMapping, setRoleMapping] = useState({});
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [userRole, setUserRole] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [roleNameToIdMap, setRoleNameToIdMap] = useState({});

  // Fetch roles and set roleMapping
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await roleAPI.getAll();
        if (response.data) {
          const roles = response.data.data.roleList;
          const mapping = {};
          const nameToIdMap = {};
          roles.forEach((role) => {
            mapping[role._id] = role.name;
            nameToIdMap[role.name] = role._id;
          });
          setRoleMapping(mapping);
          setRoleNameToIdMap(nameToIdMap);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
    fetchRoles();
  }, []);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const userRole = "superadmin";
        setUserRole(userRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    }
    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedRoleId, searchText, currentPage, pageSize]);

  useEffect(() => {
    regenerateTable();
  }, [filteredUsers]);

  const fetchData = async () => {
    try {
      const response = await userAPI.getAllByRoleId({
        search: searchText,
        roles: selectedRoleId,
        currentPage,
        pageSize,
      });

      if (response.data && response.data.data.userList) {
        const userList = response.data.data.userList;
        if (userList.users) {
          setUsers(userList.users);
          setTotalCounts(userList.pagination.totalCounts);
          setOffset(userList.pagination.offset);
        }
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const regenerateTable = () => {
    setFilteredUsers(
      users
        .filter((user) => filterRole === "" || user.roleId === selectedRoleId)
        .filter((user) =>
          user.email.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  };

  const handleSelectRole = (selectedRoleName) => {
    if (selectedRoleName === "") {
      setFilterRole(""); // Clear the filter
      setSelectedRoleId(""); // Set selectedRoleId to an empty string
    } else {
      setFilterRole(selectedRoleName);
      setSelectedRoleId(roleNameToIdMap[selectedRoleName]);
    }
  };

  const handleActivateDeactivate = (userId) => {
    const userToUpdate = users.find((user) => user._id === userId);
    if (userToUpdate) {
      const newStatus =
        userToUpdate.status === "active" ? "inactive" : "active";
      setTimeout(() => {
        userToUpdate.status = newStatus;
        setUsers([...users]);
        if (newStatus === "active") {
          message.success("User activated successfully");
        } else {
          message.success("User deactivated successfully");
        }
      }, 1000);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setOffset((page - 1) * pageSize);
    fetchData();
  };

  const handleUpdate = (userId, userRole, userRecord) => {
    if (
      userRole === "superadmin" ||
      (userRole === "admin" && userRecord.role === "admin")
    ) {
      // Implement your update logic here
      console.log("Updating user:", userId);
    } else {
      message.error("You don't have permission to update this user.");
    }
  };

  return (
    <div>
      <h2>Users Management</h2>
      <br />
      <div className="filter-search-container">
        <Input
          className="search-input"
          placeholder="Search by email"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          style={{ width: 200 }}
          value={filterRole}
          onChange={handleSelectRole}
        >
          <Option key="all" value="">
            All Users
          </Option>
          {Object.entries(roleMapping).map(([roleId, roleName]) => (
            <Option key={roleId} value={roleName}>
              {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        dataSource={filteredUsers}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCounts,
          onChange: handlePageChange,
        }}
      >
        <Column
          title="No."
          key="no"
          render={(text, record, index) => {
            const currentNo = index + 1 + (currentPage - 1) * pageSize;
            return <span>{currentNo}</span>;
          }}
        />
        <Column title="Full Name" dataIndex="fullName" key="fullName" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Phone Number"
          dataIndex="phoneNumber"
          key="phoneNumber"
        />
        <Column
          title="Role"
          dataIndex="roleId"
          key="roleId"
          render={(text, record) => (
            <span>
              {roleMapping[record.roleId]
                ? roleMapping[record.roleId].charAt(0).toUpperCase() +
                  roleMapping[record.roleId].slice(1)
                : "Unknown Role"}
            </span>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text, record) => (
            <span>{record.status === "active" ? "Active" : "Inactive"}</span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              {userRole === "superadmin" ||
              (userRole === "admin" && record.roleId === "admin") ? (
                <Button type="primary" onClick={() => handleUpdate(record.id)}>
                  Update
                </Button>
              ) : null}
              <Button
                onClick={() => handleActivateDeactivate(record.id)}
                className={
                  record.status === "active"
                    ? "deactivate-button"
                    : "activate-button"
                }
              >
                {record.status === "active" ? "Deactivate" : "Activate"}
              </Button>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default UserManagementComponent;
