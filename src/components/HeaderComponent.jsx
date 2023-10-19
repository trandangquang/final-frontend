import { Button, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/logo.webp';
import { logout, resetNotifications } from '../redux/userSlice';
import axios from 'axios';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});


  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
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
  }
  return (
    <div>
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
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand
            onClick={() => navigate('/')}
            className='cursor-pointer font-bold'
          >
            Car Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {!user ? (
                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
              ) : (
                <>
                  <Nav.Link onClick={() => navigate('/cart')}>
                    <i className='fas fa-shopping-cart'></i>
                    {user?.cart.count > 0 && (
                      <span className='badge badge-warning' id='cartcount'>
                        {user.cart.count}
                      </span>
                    )}
                  </Nav.Link>
                  <Nav.Link
                    style={{ position: 'relative' }}
                    onClick={handleToggleNotifications}
                  >
                    <i
                      className='fas fa-bell'
                      ref={bellRef}
                      data-count={unreadNotifications || null}
                    ></i>
                  </Nav.Link>

                  <NavDropdown title={`${user.email}`} >
                    {user.isAdmin ? (
                      <>
                        <NavDropdown.Item onClick={() => navigate('/admin')}>
                          Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate('/products')}>
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
                      </>
                    )}

                    <NavDropdown.Divider />
                    <div className='text-center'>
                      <Button type='primary' danger onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div
          className='notifications-container'
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
            <p>No notifcations yet</p>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default HeaderComponent;
