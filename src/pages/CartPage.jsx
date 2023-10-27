import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Alert } from 'antd';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CheckOutFormComponent from '../components/CheckOutComponent';
import * as message from '../components/MessageComponent';
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../services/appApi';

const stripePromise = loadStripe(
  'pk_test_51O54FuJumoX13lSi5n2Hm65DplfJksRtCE3pevKgmUBUzllPDzQ4tp9a4ftyvjyKn8Qvho5Nnzsn6PmyO1XT715H00Z4aAQFx9'
);

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading, isSuccess }] =
    useRemoveFromCartMutation();

  useEffect(() => {
    if (isSuccess) {
      message.success();
    }
  }, [isSuccess]);

  const handleDecrease = (product) => {
    const quantity = user.cart.count;
    if (quantity <= 0) {
      <Alert
        className='text-center text-lg'
        message='Cannot be reduced anymore'
        type='warning'
      />;
    }
    decreaseCart(product);
  };
  
  return (
    <div className='min-h-[95vh] px-44'>
      <div className='grid gap-44 grid-cols-2'>
        <div className=''>
          <h1 className='pt-2 text-center'>Cart</h1>
          {cart.length === 0 ? (
            <Alert
              className='text-center text-lg'
              message='The shopping cart is currently empty. Please add the product to your cart'
              type='success'
            />
          ) : (
            <Elements stripe={stripePromise}>
              <CheckOutFormComponent />
            </Elements>
          )}
        </div>
        <div>
          {cart.length > 0 && (
            <div>
              <>
                <Table responsive='sm' className='cart-table'>
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr>
                        <td>&nbsp;</td>
                        <td className='w-[250px]'>
                          {!isLoading && (
                            <CloseOutlined
                              className='cursor-pointer'
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            />
                          )}
                          <img
                            className='w-[200px] h-[100px] object-cover'
                            src={item.pictures[0].url}
                            alt=''
                          />
                        </td>
                        <td>{item.price}$</td>
                        <td>
                          <span>
                            <MinusOutlined
                              className='cursor-pointer'
                              onClick={() =>
                                handleDecrease({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            />
                            <span className='text-lg mx-1'>
                              {user.cart[item._id]}
                            </span>
                            <PlusOutlined
                              className='cursor-pointer'
                              onClick={() =>
                                increaseCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            />
                          </span>
                        </td>
                        <td>{item.price * user.cart[item._id]}$</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <h3 className=' pt-4'>Total: {user.cart.total}$</h3>
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
