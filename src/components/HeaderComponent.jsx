import { Button, Divider } from 'antd';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/logo.webp';
import { logout } from '../redux/userSlice';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  };
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
            className='cursor-pointer'
          >
            Car Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {!user ? (
                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
              ) : (
                <NavDropdown title={`${user.email}`} id='basic-nav-dropdown'>
                  {user.admin ? (
                    <>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      <NavDropdown.Item onClick={()=> navigate('/products')}>Create Product</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                      <NavDropdown.Item>My orders</NavDropdown.Item>
                    </>
                  )}

                  <NavDropdown.Divider />
                  <div className='text-center'>
                    <Button type='primary' danger onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderComponent;
