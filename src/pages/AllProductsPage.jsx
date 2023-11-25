import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import CardComponent from '../components/CardComponent';
import { updateProducts } from '../redux/productSlice';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='px-44 pt-4'>
      <div className='text-center'>
        <Input
          className='h-[40px] w-[200px] border-black'
          type='search'
          placeholder=' Search product'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {searchProducts.length === 0 ? (
          <h1>No Product</h1>
        ) : (
          <div className='grid grid-cols-4 justify-start items-center pt-3 font-normal text-2xl gap-1'>
            {searchProducts.map((product) => (
              <CardComponent {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
