import { RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import slide1 from '../assets/image/slide1.jpg';
import slide2 from '../assets/image/slide2.jpg';
import slide3 from '../assets/image/slide3.jpg';
import slide4 from '../assets/image/slide4.jpg';
import slide5 from '../assets/image/slide5.jpg';
import axios from '../axios';
import categories from '../categories';
import CardComponent from '../components/CardComponent';
import { updateProducts } from '../redux/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const outstandingProducts = products.slice(0, 8);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <Carousel autoplay>
        <div>
          <img className='w-full' src={slide1} alt='' />
        </div>
        <div>
          <img className='w-full' src={slide2} alt='' />
        </div>
        <div>
          <img className='w-[1897px]' src={slide3} alt='' />
        </div>
        <div>
          <img className='w-full' src={slide4} alt='' />
        </div>
        <div>
          <img className='w-full' src={slide5} alt='' />
        </div>
      </Carousel>
      <div>
        <h1 className='text-center pt-10'>Outstanding Products</h1>
        <div className='px-44 gap-4 grid grid-cols-4 justify-start items-center pt-5 font-normal text-2xl '>
          {outstandingProducts.map((product) => (
            <CardComponent {...product} />
          ))}
        </div>
      </div>
      <div className='px-44'>
        <h2 className='text-center pt-10'>Categories</h2>
        <div className='grid grid-cols-5 justify-start items-center pt-3 font-normal text-2xl gap-1'>
          {categories.map((category) => (
            <div
              onClick={() =>
                navigate(`/category/${category.name.toLocaleLowerCase()}`)
              }
            >
              <div
                style={{
                  backgroundImage: `url(${category.img})`,
                  gap: '10px',
                }}
                className='w-[304px] h-[342px] relative '
              >
                <div className='absolute bottom-5 left-4 text-white '>
                  <span className='hover:text-red-700 cursor-pointer'>
                    <RightOutlined className='text-red-700' />
                    {category.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
