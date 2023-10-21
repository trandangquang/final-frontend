import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <button
            className=' hover:bg-cyan-600 bg-cyan-500 text-white rounded-lg w-2/4 h-10 '
            onClick={() => navigate('/')}
          >
            Back Home
          </button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
