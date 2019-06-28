// Import React Packages
import React from 'react';
import { element } from 'prop-types';

// Import Files/Components
// import Header from '../layouts/Header/Header';
import Footer from '../layouts/Footer/Footer';
import Menu from "../layouts/Menu/Menu";
import './App.css';

//Holds all layouts and page rendering (content-props.children)
const App = props => (
  <div className="App Site">
    <div className="Site-content">
      {/* <Header title="Cyber Mart" /> */}
      <Menu />
      {props.children}
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  children: element
};

export default App;

