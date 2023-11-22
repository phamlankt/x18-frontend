import React, { useState } from "react";
import { Form, Input, Button, Alert } from 'antd';
import { useNavigate } from "react-router-dom";
import adminAPI from "../../apis/adminAPI";

const RegisterAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onFinish = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await adminAPI.register({
                email: data.email,
                password: data.password,
                role: data.role,
            });
            if (response.status === 200)
                navigate("/admin/user");
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register a new admin</h2>
            <Form name="register" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
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

                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 4 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button loading={loading ? true : false} type="primary" htmlType="submit">
                            Register
                        </Button>
                    </div>
                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            onClose={() => setError(null)}
                        />
                    )}
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterAdmin;
