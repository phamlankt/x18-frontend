import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Form, Input, Button, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import adminAPI from "../../apis/adminAPI";




const ProfileModal = () => {
    const { auth, handleLogin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = async (data) => {
        try {
            setLoading(true);
            setError(null);
            await adminAPI.update({
                userId: auth.user._id,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
            });
            console.log(auth.user.fullName);
            handleLogin();
        } catch (error) {
            setError(error.response.data.error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatar", file);
        } catch (error) {
            setError(error.response.data.error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(!auth.user.fullName);
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Form >
                    <Form.Item
                        name="avatar"
                        label="Avatar"
                        valuePropName="fileList"
                        getValueFromEvent={handleFileUpload}
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
                        >
                            <Avatar size={64} icon={<UploadOutlined />} />
                        </Upload>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ flex: 3 }}>
                <Form
                    name="profile"
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    initialValues={{
                        fullName: "auth.user.fullName",
                        email: auth.user.email,
                        phoneNumber: auth.user.phoneNumber,
                    }}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your full name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        {auth.user.email}
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
                        <Button type="primary" htmlType="submit">
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProfileModal;
