import React from 'react';
import { Nav, Tab, Col, Row } from 'react-bootstrap';
import UserComponent from '../components/UserComponent'
import ProductComponent from '../components/ProductComponent';
import OrderComponent from '../components/OrderComponent';


function AdminDashBoardPage() {
  return (
    <div className='px-44 pt-4'>
      <Tab.Container defaultActiveKey='products'>
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='products'>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='orders'>Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='users'>Users</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='products'>
                <ProductComponent />
              </Tab.Pane>
              <Tab.Pane eventKey='orders'>
                <OrderComponent />
              </Tab.Pane>
              <Tab.Pane eventKey='users'>
                <UserComponent />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default AdminDashBoardPage;
