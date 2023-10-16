import React from 'react';
import slide1 from '../assets/image/slide1.jpg';
import slide2 from '../assets/image/slide2.jpg';
import slide3 from '../assets/image/slide3.jpg';
import slide4 from '../assets/image/slide4.jpg';
import slide5 from '../assets/image/slide5.jpg';
import { Carousel } from 'antd';

const HomePage = () => {

  return (
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
  );
};

export default HomePage;
