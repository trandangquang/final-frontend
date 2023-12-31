import { Alert, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useUpdateUserMutation } from '../services/appApi';

const ProfilePage = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [updateUser, { isLoading, error, isSuccess, isError }] =
    useUpdateUserMutation();

  useEffect(() => {
    axios
      .get('/users/' + id)
      .then(({ data }) => {
        const user = data.user;
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setPhone(user.phone);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !phone) {
      return alert('All fields cannot be left blank');
    }
    updateUser({ id, name, address, phone }).then(({ data }) => {
      if (data) {
        return data;
      }
    });
  };

  return (
    <div className='px-44 pt-3'>
      <div className='px-[300px]'>
        <div className='w-[800px]'>
          <Form onSubmit={handleSubmit}>
            <h1 className='mt-4 text-center'>My Profile</h1>
            {isSuccess && (
              <Alert
                message='The profile has been updated successfully'
                type='success'
                showIcon
              />
            )}
            {isError && <Alert variant='danger'>{error.data}</Alert>}
            <Form.Group className='mb-3'>
              <Form.Label className='font-medium'>User name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label className='font-medium'>User Email</Form.Label>
              <Input placeholder='Your email' value={email} disabled />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label className='font-medium'>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label className='font-medium'>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your Phone Number'
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='text-center'>
              <Button type='submit' disabled={isLoading}>
                Update Profile
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
