import React from 'react';
import { element } from 'prop-types';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Menu from "./layouts/Menu/Menu";
import './App.css';

const App = props => (
  <div className="App">
    <Header title="Cyber Mart" />
    <Menu />
      {props.children}
    <Footer />
  </div>
);

App.propTypes = {
  children: element
};

export default App;

