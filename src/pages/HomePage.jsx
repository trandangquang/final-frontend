import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import slide1 from '../assets/image/slide1.jpg';
import slide2 from '../assets/image/slide2.jpg';
import slide3 from '../assets/image/slide3.jpg';
import slide4 from '../assets/image/slide4.jpg';
import slide5 from '../assets/image/slide5.jpg';
import axios from '../axios';
import { updateProducts } from '../redux/productSlice';
import CardComponent from '../components/CardComponent';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row } from 'react-bootstrap';
import categories from '../categories';

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const outstandingProducts = products.slice(0, 8);

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
      <div className='recent-products-container container mt-4'>
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: '10px',
                  }}
                  className='category-tile'
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
