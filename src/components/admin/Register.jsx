import React, { useContext, useState } from "react";
import { Form, Input, Select, Button } from 'antd';
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import adminAPI from "../../apis/adminAPI";
import authAPI from "../../apis/authAPI";

const { Option } = Select;

const RegisterAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

    const onFinish = async (data) => {
        console.log(data.email);
        console.log(data.password);
        console.log(data.role);
        try {
            setLoading(true);
            setError(null);
            const response = await adminAPI.register({
                email: data.email,
                password: data.password,
                role: data.role,
            });
            if (response.status === 200) {
                const response = await authAPI.login({
                    email: data.email,
                    password: data.password,
                });

                localStorage.setItem("accessToken", response.data.data.accessToken);

                await handleLogin();
                navigate("/admin/user");
            }
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register a new admin</h2>
            <Form name="register" onFinish={onFinish}>
                <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email is invalid!',
                        },
                        {
                            required: true,
                            message: 'Email is required!',
                        },
                    ]}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required!',
                        },
                    ]}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Password is not match!');
                            },
                        }),
                    ]}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        {
                            required: true,
                            message: 'Choose a role!',
                        },
                    ]}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Select>
                        <Option value="superadmin">Super Admin</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 4 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            {loading ? "Loading" : "Register"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterAdmin;
