import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import LoadingComponent from '../components/LoadingComponent';
import * as message from '../components/MessageComponent';
import { useAddToCartMutation } from '../services/appApi';

const ProductPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      message.success();
    }
  }, [isSuccess]);

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
    });
  }, [id]);

  if (!product) {
    return <LoadingComponent />;
  }

  const images = product.pictures.map((picture) => (
    <div>
      <img src={picture.url} alt='' />
    </div>
  ));

  return (
    <div className='pt-4 px-44 gap-4 grid grid-cols-2'>
      <div>{images}</div>
      <div className='pt-4 text-center'>
        <h1>{product.name}</h1>
        <p>
          <strong>Category: </strong>
          {product.category}
        </p>
        <p className='font-medium'>
          <strong>Price: </strong>
          {product.price}$
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        {user && !user.isAdmin && (
          <Button
            type='primary'
            htmlType=''
            onClick={() =>
              addToCart({
                userId: user._id,
                productId: id,
                price: product.price,
                image: product.pictures[0].url,
              })
            }
          >
            Add to cart
          </Button>
        )}
        {user && user.isAdmin && (
          <div>
            <Button
              type='primary'
              htmlType=''
              onClick={() => navigate(`/product/${product._id}/edit`)}
            >
              Edit Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
