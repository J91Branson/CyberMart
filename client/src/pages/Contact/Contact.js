// Import React Packages
import React from 'react';

// Import Files/Components
import Content from "../../layouts/Content/Content";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Contact.css';
import { whileStatement } from '@babel/types';

const divStyle = {
  color: 'white',
  backgroundImage: 'url("adventure-animal-day-1612847.jpg")',
  height: '600px'
};

const Contact = () => (
  <Content>


    <Row>

      <Col xs={{ span: 12 }}>
        <div style={divStyle}>


          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <Card className="contactC">
            <Card.Body>
              <Card.Title as="h1">Contact Pets-buy</Card.Title>
              <Card.Text as="h2">
                We communicate well with pets, but we also speak human, contact us or talk to our bot.
              </Card.Text>
            </Card.Body>
          </Card>





        </div>

      </Col>
    </Row>
    <Container fluid>


      <Row>
        <Col xs={12} md={4}>
          <h1>Customer Service Team</h1>
          <h5>Monday-Friday</h5>
          <h5>8:00AM-4:00PM CST </h5>
          <h5>800-775-5555</h5>
        </Col>
        <Col xs={12} md={4}>
          <h1>Email</h1>
          <h5>petsbuy@gmail.com</h5>
        </Col>
        <Col xs={12} md={4}>
          <h1>Corporate Office</h1>
          <h5>1970 Disco Drive</h5>
          <h5>Grooveville Alaska</h5>
        </Col>
      </Row>
    </Container>
  </Content>
);

export default Contact;