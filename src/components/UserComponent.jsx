import { Button, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const confirm = async (_id) => {
    await axios.delete(`users/${_id}`).then(({ data }) => {
      console.log('data', data);
    });

    await axios.get('/users').then(({ data }) => {
      setLoading(false);
      setUsers(data);
    });
  };
  const cancel = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('/users')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  if (users.length === 0) {
    return <h1 className='text-center pt-4'>No users yet</h1>;
  }

  const TableRow = ({ _id, name, email }) => {
    return (
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
          <div>
            <Popconfirm
              title='Delete the product'
              description='Are you sure to delete product?'
              onConfirm={() => confirm(_id)}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              <Button danger type='primary'>
                Delete
              </Button>
            </Popconfirm>
          </div>
          <div className='pt-2'>
            <Button
              type='primary'
              htmlType=''
              onClick={() => navigate(`/user/${_id}/profile`)}
              className='w-[72px]'
            >
              Edit
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <PaginationComponent
            data={users}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default UserComponent;
