import { Avatar, Button, Input, List, Pagination, Spin, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import userAPI from "../../../apis/userAPI";
import roleAPI from "../../../apis/roleAPI";
import AlertContext from "../../../contexts/AlertContext/AlertContext";
import { useContext } from "react";

const UserList = ({ currentUser, setCurrentUser }) => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const getUsers = async (query) => {
    const resRole = await roleAPI.getAll();
    const recruiterRole = resRole.data.data.roleList.find(
      (role) => role.name === "recruiter"
    );
    const resUser = await userAPI.getAllByRoleId({
      ...query,
      roles: recruiterRole._id,
    });

    setUserList(resUser.data?.data?.userList);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSeachChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      try {
        setLoading(true);
        getUsers({ search, currentPage });
      } catch (error) {
        setErr(error?.response?.data?.message);
        handleAlertStatus({ type: "error", message: "Something went wrong" });
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(debounceFn);
  }, [search, currentPage]);

  if (err) {
    return <p className="m-2 text-red">{err}</p>;
  }

  return (
    <>
      <Input
        name="search"
        placeholder="Enter user email"
        onChange={handleSeachChange}
        value={search}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Find user by email">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
      <Button
        className="mt-2"
        type="primary"
        onClick={() => {
          setCurrentUser("");
          setSearch("");
        }}
      >
        See All Jobs
      </Button>

      <div
        className="hide-scrollbar"
        style={{
          width: "100%",
          margin: "2em 0",
        }}
      >
        <List
          itemLayout="horizontal"
          loading={loading}
          style={{ overflow: "hidden" }}
          dataSource={userList.users}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "4px",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor:
                  currentUser === item._id ? "rgba(43, 58, 103, 0.5)" : "white",
              }}
              onClick={() => setCurrentUser(item._id)}
              key={item._id}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatarUrl} />}
                title={item.fullName}
                description={item.email}
              />
            </List.Item>
          )}
        />
        <div className="w-100 mt-2 d-flex justify-content-center">
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={userList?.pagination?.totalCounts || 0}
            pageSize={userList?.pagination?.pageSize || 10}
            showSizeChanger={false}
            onChange={handlePageChange}
            position="bottom"
            align="center"
            className="pagination"
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
