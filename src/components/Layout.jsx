import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './NavBar';

export default ({ children }) => (
  <Container>
    <Row>
      <Col>
        <NavBar />
      </Col>
    </Row>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
);
