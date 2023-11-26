import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import LoadingComponent from '../components/LoadingComponent';

function OrderPage() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [user?.notifications]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (orders.length === 0) {
    return <h1 className='text-center pt-3'>Currently there are no orders</h1>;
  }

  return (
    <div className='px-44'>
      <h1 className='text-center'>Your orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>
                <Badge
                  bg={`${
                    order.status === 'processing' ? 'warning' : 'success'
                  }`}
                  text='white'
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>
              <td>{order.total}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderPage;
