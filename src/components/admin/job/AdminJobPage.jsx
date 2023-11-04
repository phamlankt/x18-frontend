import { Col, Row } from "antd";
import React from "react";
import UserList from "./UserList";
import { useState } from "react";
import JobList from "./JobList";

const AdminJobPage = () => {
  const [currentUser, setCurrentUser] = useState();
  const props = { currentUser, setCurrentUser };
  return (
    <div>
      <Row>
        <Col span={19} push={5}>
          <h1 className="text-center fs-5">Job List</h1>
          <hr />
          <JobList {...props} />
        </Col>

        <Col span={5} pull={19}>
          <h1 className="text-center fs-5">Company List</h1>
          <hr />
          <UserList {...props} />
        </Col>
      </Row>
    </div>
  );
};

export default AdminJobPage;
