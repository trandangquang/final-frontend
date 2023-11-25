import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import {
  useCreateOrderMutation,
  useUpdateUserMutation,
} from '../services/appApi';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const id = user._id;
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [name, setName] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paying, setPaying] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    axios
      .get('/users/' + id)
      .then(({ data }) => {
        const user = data.user;
        setName(user.name);
        setAddress(user.address);
        setPhone(user.phone);
      })
      .catch((e) => console.log(e));
  }, [id]);

  async function handlePay(e) {
    e.preventDefault();
    if (!name || !address || !phone) {
      return alert('All fields cannot be left blank');
    }
    updateUser({ id, name, address, phone }).then(({ data }) => {
      if (data) {
        return data;
      }
    });
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      'https://carstore-api.onrender.com/create-payment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ',
        },
        body: JSON.stringify({ amount: user.cart.total }),
      }
    ).then((res) => res.json());
    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      createOrder({ owner: user._id, cart: user.cart, address, phone }).then(
        (res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
              navigate('/orders');
            }, 1000);
          }
        }
      );
    }
  }

  return (
    <div>
      <Form onSubmit={handlePay}>
        <div>
          {alertMessage && (
            <Alert message={alertMessage} type='success' showIcon />
          )}
          <div>
            <Form.Group className='mb-3'>
              <Form.Label className='font-semibold'>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className='mb-3'>
              <Form.Label className='font-semibold'>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Email'
                value={user.email}
                disabled
              />
            </Form.Group>
          </div>
        </div>
        <div>
          <div>
            <Form.Group className='mb-3'>
              <Form.Label className='font-semibold'>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className='mb-3'>
              <Form.Label className='font-semibold'>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>
        <label className='font-semibold pb-2' htmlFor='card-element'>
          Card
        </label>
        <CardElement id='card-element' />
        <div className='text-center'>
          <Button
            className='mt-3'
            type='submit'
            disabled={user.cart.count <= 0 || paying || isSuccess}
          >
            {paying ? 'Processing...' : 'Pay'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CheckoutForm;
