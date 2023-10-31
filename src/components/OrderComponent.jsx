import React, { useEffect, useState } from 'react';
import { Badge, Modal, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const markShipped = (orderId, ownerId) => {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  const showOrder = (productsObj) => {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    console.log(productsToShow);
    setShow(true);
    setOrderToShow(productsToShow);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get('/orders')
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  if (orders.length === 0) {
    return <h1 className='text-center pt-4'>No orders yet</h1>;
  }

  const TableRow = ({ _id, count, owner, total, status, products, address }) => {
    return (
      <tr>
        <td>{_id}</td>
        <td>{owner?.name}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>{address}</td>
        <td>
          {status === 'processing' ? (
            <Button
              type='primary'
              htmlType=''
              onClick={() => markShipped(_id, owner?._id)}
            >
              Mark as shipped
            </Button>
          ) : (
            <Badge bg='success'>Shipped</Badge>
          )}
        </td>
        <td>
          <span className='cursor-pointer' onClick={() => showOrder(products)}>
            View order <EyeOutlined />
          </span>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>Order Total</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <PaginationComponent
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div className='flex justify-around py-2'>
            <img
              src={order.pictures[0].url}
              className='max-w-[180px] h-[100px] object-cover'
              alt=''
            />
            <p>
              <span>{order.count} x </span> {order.name}
            </p>
            <p>Price: {Number(order.price) * order.count}$</p>
          </div>
        ))}
        <Modal.Footer>
          <Button type='primary' danger onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderComponent;
