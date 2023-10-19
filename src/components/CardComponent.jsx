import { Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const CardComponent = ({ _id, category, name, price, pictures }) => {
  const navigate = useNavigate()
  return (
    <div>
      <Card
        headStyle={{ width: '368px', height: '207px' }}
        hoverable
        style={{
          width: 368,
        }}
        bodyStyle={{ padding: 20 }}
        cover={
          <img
            onClick={() => navigate(`/product/${_id}`)}
            className='h-[207px] object-contain'
            alt='example'
            src={pictures[0].url}
          />
        }
      >
        <div className='text-lg '>
          <div
            onClick={() => navigate(`/product/${_id}`)}
            className='hover:text-red-700 text-2xl'
          >
            {name}
          </div>
          <div
            onClick={() => navigate(`/product/${_id}`)}
            className='hover:text-red-700 text-2xl'
          >
            {price}
          </div>
          <div
            onClick={() => navigate(`/product/${_id}`)}
            className='hover:text-red-700 text-2xl'
          >
            {category}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
