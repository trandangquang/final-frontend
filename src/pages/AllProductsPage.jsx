import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import CardComponent from '../components/CardComponent';
import { updateProducts } from '../redux/productSlice';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const allProduct = products.slice(0, 8);

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div className='px-44'>
      <div className='grid grid-cols-4 justify-start items-center pt-3 font-normal text-2xl gap-1'>
        {allProduct.map((product) => (
          <CardComponent {...product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
