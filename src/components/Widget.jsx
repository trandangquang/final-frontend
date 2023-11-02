import React from 'react';

const Widget = ({ data }) => {
  return (
    <div className='items-center flex space-x-4'>
      <div className='rounded text-5xl'>{data.icon}</div>
      <div className='pr-32'>
        <h3 className='pl-8'>
          {data.isMoney
            ? '$' + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </h3>
        <p className='pl-8'>{data.title}</p>
      </div>
    </div>
  );
};

export default Widget;
