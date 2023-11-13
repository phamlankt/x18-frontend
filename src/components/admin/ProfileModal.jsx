import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Spin,
  Alert,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import adminAPI from "../../apis/adminAPI";
import "../../scss/_admin-profile-modal.scss";

const ProfileModal = ({ isOpenModal, userId, userData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileAvatar, setFileAvatar] = useState(null);


  const onFinish = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();

      formData.append("userId", userId);
      if (fileAvatar) formData.append("avatar", fileAvatar);
      if (data.fullName) formData.append("fullName", data.fullName);
      if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);

      await adminAPI.update(formData);
      message.success("Profile updated successfully", 3);
      isOpenModal(false);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFile = (file) => {
    console.log(file);
    setFileAvatar(file.fileList[0].originFileObj);
  };

  return (
    <div className="container-admin-profile-modal">
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      )}
      <div className="fl1">
        <Form>
          <Form.Item
            className="mt32"
            name="avatar"
            getValueFromEvent={handleUploadFile}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              customRequest={({ onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              accept=".jpg,.png,.jpeg"
              maxCount={1}
            >
              <Avatar size={64} icon={<UploadOutlined />} />
            </Upload>
          </Form.Item>
        </Form>
      </div>
      <div className="fl3">
        <Form
          name="profile"
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          initialValues={{
            fullName: userData.fullName ? userData.fullName : "",
            phoneNumber: userData.phoneNumber ? userData.phoneNumber : "",
          }}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter your full name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            {userData.email}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={loading ? <Spin /> : null}
            >
              {loading ? "Uploading" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfileModal;
