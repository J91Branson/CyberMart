import React from 'react';
import { element } from 'prop-types';
import Header from '../layouts/Header/Header';
import Content from '../layouts/Content/Content';
import Footer from '../layouts/Footer/Footer';
import Nav from '../layouts/Nav/Nav';
import './App.css';

const App = props => (
  <div className="App">
    <Header title="Cyber Mart" />

    <Nav />
    
    <Content>
      {props.children}
    </Content>

    <Footer />
  </div>
);

App.propTypes = {
  children: element
};

export default App;

