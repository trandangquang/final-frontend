import React from 'react'
import { Divider } from 'antd';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/image/logo.webp';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
   const navigate = useNavigate()
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
              <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};


export default HeaderComponent