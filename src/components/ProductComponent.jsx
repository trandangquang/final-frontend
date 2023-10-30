import { Button, Popconfirm } from 'antd';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../services/appApi';
import PaginationComponent from './PaginationComponent';
import './product.scss';

const ProductComponent = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const confirm = (id) => {
    deleteProduct({ product_id: id, user_id: user._id });
  };
  const cancel = (id) => {
    console.log(id);
  };

  const TableRow = ({ pictures, _id, name, price }) => {
    return (
      <tr>
        <td>
          <img
            src={pictures[0].url}
            className='dashboard-product-preview'
            alt=''
          />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}$</td>
        <td>
          <div>
            <Popconfirm
              title='Delete the product'
              description='Are you sure to delete product?'
              onConfirm={() => confirm(_id, user._id)}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              <Button disabled={isLoading} danger type='primary'>
                Delete
              </Button>
            </Popconfirm>
          </div>
          <div className='pt-2'>
            <Button
              type='primary'
              htmlType=''
              onClick={() => navigate(`/product/${_id}/edit`)}
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
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <PaginationComponent
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
};

export default ProductComponent;
