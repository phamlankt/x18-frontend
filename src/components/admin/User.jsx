import React, { useEffect, useState } from 'react';
import { Table, Alert, Button } from 'antd';
import adminAPI from '../../apis/adminAPI';
import { NavLink } from 'react-router-dom';
import '../../scss/_user-page.scss';

const UserList = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: (avatarUrl) => (
                <img src={avatarUrl} alt="Avatar" style={{ width: '50px', height: '50px' }} />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
    ];

    const getAllUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminAPI.allUser();
            setUserData(data.data.data.userList.users);
        } catch (error) {
            setError(error.response.data.error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUser();
    }, []);


    return (
        <div>
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
            <NavLink to="/admin/register">
                <Button
                    type="primary"
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 160,
                    }}
                >
                    Register a new admin
                </Button>
            </NavLink>

            <Table
                dataSource={userData}
                columns={columns}
                loading={loading}
                rowKey="_id"
                pagination={false}
                className="zebra-table"
            />
        </div>
    );
};

export default UserList;