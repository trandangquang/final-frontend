import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Dropdown } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import caymanbg from '../assets/image/718caymanbg.jpg';
import sport from '../assets/image/911-sport.png';
import porschetarga from '../assets/image/911-targa.png';
import turbobg from '../assets/image/911-turbo-bg.jpg';
import turbo from '../assets/image/911-turbo.png';
import canyennebg from '../assets/image/canyenne-bg.jpg';
import canyennecoupe from '../assets/image/canyenne-coupe.png';
import canyenne from '../assets/image/canyenne.png';
import dakar from '../assets/image/dakar-911.png';
import logo from '../assets/image/logo.webp';
import macanbg from '../assets/image/macan-bg.jpg';
import macan from '../assets/image/macan.png';
import boxstermodel from '../assets/image/model-718-boxster.png';
import caymanmodel from '../assets/image/model-718-cayman.png';
import porscheS from '../assets/image/model-911-S.png';
import porschecarrera from '../assets/image/model-911-carrera.png';
import dakarbg from '../assets/image/model-911-dakar-bg.jpg';
import panamerabg from '../assets/image/model-panamera-bg.jpg';
import taycanbg from '../assets/image/model-taycan-bg.jpg';
import panameragts from '../assets/image/panamera-GTS.png';
import panameragturbo from '../assets/image/panamera-turbo.png';
import panamera from '../assets/image/panamera.png';
import porschecarrerabg from '../assets/image/porsche-911-bg.jpg';
import porschebgboxster from '../assets/image/porsche-bg.jpg';
import styleedition from '../assets/image/style-edition-718.png';
import taycancross from '../assets/image/taycan-cross.png';
import taycan from '../assets/image/taycan.png';
import { logout, resetNotifications } from '../redux/userSlice';

const items = [
  {
    key: '1',
    label: '718',
    children: [
      {
        key: '1-1',
        label: '718 Cayman Version',
        children: [
          {
            key: '1-1-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={caymanbg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={caymanmodel} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '1-2',
        label: '718 Boxster Version',
        children: [
          {
            key: '1-2-1',
            label: (
              <div className=' relative ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={porschebgboxster} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={boxstermodel} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '1-3',
        label: '718 Style Edition Version',
        children: [
          {
            key: '1-3-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={porschebgboxster} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={styleedition} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    key: '2',
    label: '911',
    children: [
      {
        key: '2-1',
        label: '911 Carrera Version',
        children: [
          {
            key: '2-1-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={porschecarrerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={porschecarrera} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '2-2',
        label: '911 Carrera S Version',
        children: [
          {
            key: '2-2-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={porschecarrerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={porscheS} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '2-3',
        label: '911 Targa Version',
        children: [
          {
            key: '2-3-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={porschecarrerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={porschetarga} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '2-4',
        label: '911 Turbo Version',
        children: [
          {
            key: '2-4-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={turbobg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={turbo} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '2-5',
        label: '911 Sport Classic Version',
        children: [
          {
            key: '2-5-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={porschecarrerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={sport} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '2-6',
        label: '911 Dakar Version',
        children: [
          {
            key: '2-6-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={dakarbg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={dakar} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },

  {
    key: '3',
    label: 'Taycan',
    children: [
      {
        key: '3-1',
        label: 'Taycan Version',
        children: [
          {
            key: '3-1-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={taycanbg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={taycan} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '3-2',
        label: 'Cross Turismo Version',
        children: [
          {
            key: '3-2-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={taycanbg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={taycancross} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },

  {
    key: '4',
    label: 'Panamera',
    children: [
      {
        key: '4-1',
        label: 'Panamera Version',
        children: [
          {
            key: '4-1-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={panamerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={panamera} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '4-2',
        label: 'Panamera GTS Version',
        children: [
          {
            key: '4-2-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={panamerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={panameragts} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '4-3',
        label: 'Panamera Turbo S Version',
        children: [
          {
            key: '4-3-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={panamerabg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={panameragturbo} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    key: '5',
    label: 'Macan',
    children: [
      {
        key: '5-1',
        label: 'Macan Version',
        children: [
          {
            key: '5-1-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={macanbg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={macan} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    key: '6',
    label: 'Cayenne',
    children: [
      {
        key: '6-1',
        label: 'Cayenne Version',
        children: [
          {
            key: '6-1-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={canyennebg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={canyenne} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
      {
        key: '6-2',
        label: 'Cayenne Coupé Version',
        children: [
          {
            key: '6-2-1',
            label: (
              <div className=' relative  ml-0 pl-0 pr-0 pt-0 pb-0 h-[500px] w-full inline-block align-top bg-none'>
                <div className=' z-0 top-0 right-0 w-full h-[500px] relative overflow-hidden'>
                  <img src={canyennebg} alt='' />
                </div>
                <div className=' z-10 w-[50%] max-w-[47%] left-0 bottom-0 absolute'>
                  <img src={canyennecoupe} alt='' />
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
];

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === 'unread') return acc + 1;
    return acc;
  }, 0);

  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === 'block' ? 'none' : 'block';
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  };
  return (
    <div className='px-44 '>
      <div className='w-full h-full p-[2px]'>
        <Divider>
          <img
            onClick={() => navigate('/')}
            className='cursor-pointer mb-11'
            width={133}
            h={'auto'}
            src={logo}
            alt=''
          />
        </Divider>
      </div>

      <div className='flex flex-row justify-between h-full w-full items-center'>
        <Dropdown
          menu={{
            items,
          }}
        >
          <div
            className=' hover:text-red-600 text-3xl font-medium leading-10 cursor-pointer'
            onClick={() => navigate('/all-product')}
          >
            Porsche Models
          </div>
        </Dropdown>

        <div className=''>
          <div>
            <div className='flex items-center '>
              {!user ? (
                <span
                  className='cursor-pointer'
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              ) : (
                <>
                  {user && !user.isAdmin && (
                    <div onClick={() => navigate('/cart')}>                  
                        <Badge count={user.cart.count}>
                          <ShoppingCartOutlined className='text-3xl cursor-pointer' />
                        </Badge>
                    </div>
                  )}
                  <div className='relative' onClick={handleToggleNotifications}>
                    <BellOutlined
                      className='text-2xl pl-3'
                      ref={bellRef}
                      data-count={unreadNotifications || null}
                    />
                  </div>
                  <div>
                    <NavDropdown title={`${user.email}`}>
                      {user.isAdmin ? (
                        <>
                          <NavDropdown.Item onClick={() => navigate('/admin')}>
                            Dashboard
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate('/products')}
                          >
                            Create Product
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <>
                          <NavDropdown.Item onClick={() => navigate('/cart')}>
                            Cart
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => navigate('/orders')}>
                            My orders
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => navigate('/profile')}>
                            My Profile
                          </NavDropdown.Item>
                        </>
                      )}

                      <NavDropdown.Divider />
                      <div className='text-center'>
                        <Button type='primary' danger onClick={handleLogout}>
                          Logout
                        </Button>
                      </div>
                    </NavDropdown>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            ref={notificationRef}
            style={{
              position: 'absolute',
              top: bellPos.top + 30,
              left: bellPos.left,
              display: 'none',
            }}
          >
            {user?.notifications > 0 ? (
              user?.notifications.map((notification) => (
                <p className={`notification-${notification.status}`}>
                  {notification.message}
                  <br />
                  <span>
                    {notification.time.split('T')[0] +
                      ' ' +
                      notification.time.split('T')[1]}
                  </span>
                </p>
              ))
            ) : (
              <p>No notification</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
