import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AiOutlineFunction } from "react-icons/ai";
import { Pagination } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { message } from 'antd';


const { Column } = Table;
const { Option } = Select;

const  UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "0123456789",
        role: "Applicant",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "0123456789",
        role: "Recruiter",
        status: "Inactive",
      },
    ];

    setUsers(mockUsers);
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const roleMatch = filterRole === "all" || user.role === filterRole;
      const nameMatch = user.name.toLowerCase().includes(searchText.toLowerCase());
      return roleMatch && nameMatch;
    });
    setFilteredUsers(filtered);
  }, [users, searchText, filterRole]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleUpdate = (userId) => {
    // Update with API later to navigate to user profile
  };
  
  const handleActivateDeactivate = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId);
  
    if (userToUpdate) {
      const newStatus = userToUpdate.status === 'active' ? 'inactive' : 'active';
  
      // Simulate a delay for API call (replace this with your actual API call)
      setTimeout(() => {
        // Update the user's status
        userToUpdate.status = newStatus;
  
        // Update the users array with the modified user
        setUsers([...users]);
  
        if (newStatus === 'active') {
          message.success('User activated successfully');
        } else {
          message.success('User deactivated successfully');
        }
      }, 1000);
    }
  };
  

  return (
    <div>
      <h2>Users Management</h2>
      <div className="filter-search-container">
      <Input
    className="search-input"
    placeholder="Search by name"
    prefix={<SearchOutlined />}
    onChange={(e) => handleSearch(e.target.value)}
  />
  <Select
    style={{ width: 200 }}
    value={filterRole}
    onChange={(value) => setFilterRole(value)}
  >
    <Option value="all">All Roles</Option>
    <Option value="applicant">Applicant</Option>
    <Option value="recruiter">Recruiter</Option>
    {/* Add more role options as needed */}
  </Select>
  
</div>
      <Table className="ant-table" dataSource={filteredUsers} rowKey="id">
        <Column title="No." dataIndex="id" key="id" render={(text, record, index) => index + 1} />
        <Column title="Full Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone Number" dataIndex="phone" key="phone" />
        <Column title="Role" dataIndex="role" key="role" />
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
              className={`ant-btn-${record.status === "active" ? "deactivate" : "activate"}`}
              onClick={() => handleActivateDeactivate(record.id)}
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
