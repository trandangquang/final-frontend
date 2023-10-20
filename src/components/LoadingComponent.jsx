import { Spin } from 'antd';
import React from 'react';


function LoadingComponent() {
  return (
    <div
      className='loading-container'
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin tip='Loading' size='large'>
        <div className='content' />
      </Spin>
    </div>
  );
}

export default LoadingComponent;
