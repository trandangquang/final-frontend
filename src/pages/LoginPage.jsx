import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/image/login.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  return (
    <div className='absolute w-full h-full flex items-center overflow-hidden'>
      <img className='relative object-cover' src={loginImage} alt='' />

      <div className='absolute flex flex-col items-center bg-white h-[600px] w-[437px] rounded-lg right-4'>
        <div className='px-8 pt-5 pb-8 items-center justify-center gap-10 flex-col'>
          <h1 className='font-medium font-mono text-4xl text-center'>
            PORSCHE
          </h1>
          <h3 className='font-medium text-2xl leading-8 mt-5 mb-3'>
            Nice to see you.
          </h3>

          <Form name='login-form' autoComplete='off'>
            <div className='flex flex-col gap-1'>
              <span className='font-semibold'>Porsche ID (E-mail-Address)</span>

              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
                hasFeedback
              >
                <Input
                  className='placeholder:italic placeholder:text-slate-600 bg-white w-[400px] h-[50px] border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-lg'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='font-semibold'>Password</span>

              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder='Password'
                  className='placeholder:italic placeholder:text-slate-600 bg-white w-[400px] h-[50px] border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-lg'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className='flex justify-center mt-8'>
              <button
                type='submit'
                // disabled={isLoading}
                className='rounded-full text-white bg-black w-full h-[50px] sm:text-xl
                          hover:border-none hover:!text-white hover:!bg-black disabled:bg-slate-900 disabled:text-white disabled:border-none'
                // onClick={handleLogin}
              >
                {/* {isLoading ? 'Logging in ...' : 'Log in now'} */}Log in
              </button>
            </div>

            <div className='inline-flex items-center justify-center w-full'>
              <hr className='w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
              <span className='absolute px-3 font-medium  -translate-x-1/2 bg-white left-1/2  '>
                or
              </span>
            </div>
            <p className='mt-3'>
              <span
                className='underline underline-offset-2 mr-1 cursor-pointer'
                onClick={() => navigate('/register')}
              >
                Register now,
              </span>
              to discover the digital world of Porsche.
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
