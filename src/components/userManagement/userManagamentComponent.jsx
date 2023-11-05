import React, { useState, useEffect } from "react";
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
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await roleAPI.getAll();
      if (response.data) {
        const roles = response.data.data.roleList;
        const mapping = {};
        roles.forEach((role) => {
          mapping[role.name] = role._id;
        });
        setRoleMapping(mapping);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchData(selectedRoleId);
  }, [selectedRoleId, searchText, currentPage, pageSize]);

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

  useEffect(() => {
    fetchData();
  }, [selectedRoleId, searchText, currentPage, pageSize]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    fetchData(selectedRoleId);
  }, [selectedRoleId, searchText, currentPage, pageSize]);

  const handleSelectRole = (selectedRoleName) => {
    setFilterRole(selectedRoleName);
    const selectedRoleId = roleMapping[selectedRoleName] || "";
    setSelectedRoleId(selectedRoleId);
  };

  useEffect(() => {
    fetchData();
  }, [searchText, currentPage, pageSize]);

  useEffect(() => {
    const filtered = users
      .filter((user) => filterRole === "" || user.role === filterRole)
      .filter((user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    setFilteredUsers(filtered);
  }, [users, searchText, filterRole]);

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

  const handleUpdate = (userId) => {
    // To implement the update user API later
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setOffset((page - 1) * pageSize);
    fetchData(selectedRoleId);
  };

  return (
    <div>
      <h2>Users Management</h2>
      <br></br>
      <div className="filter-search-container">
        <Input
          className="search-input"
          placeholder="Search by email"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          style={{ width: 200 }}
          value={filterRole}
          onChange={handleSelectRole}
        >
          <Option key="all" value="">
            All Roles
          </Option>
          {Object.entries(roleMapping).map(([roleName, roleId]) => (
            <Option key={roleId} value={roleName}>
              {roleName.charAt(0).toUpperCase() + roleName.slice(1)}{" "}
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
              <Button type="primary" onClick={() => handleUpdate(record.id)}>
                Update
              </Button>
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
