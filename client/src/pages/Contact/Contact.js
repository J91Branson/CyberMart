// Import React Packages
import React from 'react';

// Import Files/Components
import Content from "../../layouts/Content/Content";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Contact.css';
import { whileStatement } from '@babel/types';


const Contact = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div class="card bg-dark text-white">
          <img className="card-img-top" src={process.env.PUBLIC_URL + "/assets/adventure-animal-day-1612847.jpg"} />
          <div class="card-img-overlay">
            <h1 class="card-title">Contact Pets-buy</h1>
            <h3 class="card-text">We communicate well with pets, but we also speak human, contact us or talk to our bot.</h3>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <br /><br />
        <h1>Customer Service Team</h1>
        <h5>Monday-Friday</h5>
        <h5>8:00AM-4:00PM CST </h5>
      </div>
      <div className="col-md-4">
        <br /><br />
        <h1>Email</h1>
        <h5>petsbuy@gmail.com</h5></div>
      <div className="col-md-4">
        <br /><br />
        <h1>Corporate Office</h1>
        <h5>1970 Disco Drive</h5>
        <h5>Grooveville Alaska</h5>
      </div>
    </div>
  </div>
);

export default Contact;