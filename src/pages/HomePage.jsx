import { RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import slide1 from '../assets/image/slide1.jpg';
import slide2 from '../assets/image/slide2.jpg';
import slide3 from '../assets/image/slide3.jpg';
import slide4 from '../assets/image/slide4.jpg';
import slide5 from '../assets/image/slide5.jpg';
import categories from '../categories';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='pt-3'>
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

      <div className='px-44'>
        <h2 className='text-center pt-10 cursor-pointer' onClick={()=> navigate('/all-product')}>Models</h2>
        <div className='grid grid-cols-5 justify-start items-center pt-3 font-normal text-2xl gap-1'>
          {categories.map((category) => (
            <div
            className='cursor-pointer'
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
