import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Button, Input, Select, message } from "antd";
import "../../scss/_userManagement.scss";
import userAPI from "../../apis/userAPI";

const { Column } = Table;
const { Option } = Select;

const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCounts, setTotalCounts] = useState(0);
  const [offset, setOffset] = useState(0);
  const [roleMapping, setRoleMapping] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAPI.getAll(
          searchText,
          filterRole,
          currentPage,
          pageSize
        );
        console.log("API Response:", response);
  
        if (response.data && response.data.userList) {
          const userList = response.data.userList;
          console.log("test:", userList);
          if (userList.users) {
            const newUsers = userList.users.map((user) => ({
              ...user,
              roleName: roleMapping[user.roleId] || 'Unknown Role',
            }));
            const newTotalCounts = userList.pagination.totalCounts;
          setUsers(newUsers);
          setTotalCounts(newTotalCounts);
          setOffset(newUsers.length);
        } else {
          console.error("API response is missing 'users'.");
        }
      } else {
        console.error("API response is missing 'userList'.");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };
  
    fetchData();
  }, [searchText, filterRole, currentPage, pageSize]);
  

  // Fetch roles from your API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await userAPI.getAllRoles();
        if (response.data) {
          const roles = response.data.roles;
          const mapping = {};
          roles.forEach((role) => {
            mapping[role.roleId] = role.name;
          });

          setRoleMapping(mapping);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const roleMatch = filterRole === 'all' || user.role === filterRole;
      const nameMatch = user.fullName.toLowerCase().includes(searchText.toLowerCase());
      return roleMatch && nameMatch;
    });
    setFilteredUsers(filtered);
  }, [users, searchText, filterRole]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleActivateDeactivate = (userId) => {
    const userToUpdate = users.find((user) => user._id === userId);

    if (userToUpdate) {
      const newStatus = userToUpdate.status === 'active' ? 'inactive' : 'active';
      setTimeout(() => {
        userToUpdate.status = newStatus;
        setUsers([...users]);

        if (newStatus === 'active') {
          message.success('User activated successfully');
        } else {
          message.success('User deactivated successfully');
        }
      }, 1000);
    }
  };

  const handleUpdate = (userId) => {
    // To implement the update user API later
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  console.log("Users:", users);
console.log("Filtered Users:", filteredUsers);

  return (
    <div>
      <h2>Users Management</h2>
      <div className="filter-search-container">
        <Input
          className="search-input"
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
        />
         <Select
          style={{ width: 200 }}
          value={filterRole}
          onChange={(value) => setFilterRole(value)}
        >
          <Option key="all" value="all">
            All Roles
          </Option>
          {Object.entries(roleMapping).map(([roleId, roleName]) => (
            <Option key={roleId} value={roleId}>
              {roleName}
            </Option>
          ))}
        </Select>
        <Button className="btn-search" type="primary">
          Search
        </Button>
      </div>
      <Table dataSource={filteredUsers} rowKey="id">
        <Column title="No" dataIndex="id" key="id" />
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
          key="role"
          render={(roleId) => {
            const roleName = roleMapping[roleId] || 'Unknown Role';
            return <span>{roleName}</span>;
          }}
        />
        <Column title="Status" dataIndex="status" key="status" />
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
