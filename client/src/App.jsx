import React from 'react';
import { element } from 'prop-types';
import Header from './pages/components/layout/Header/Header';
import Content from './pages/components/layout/Content/Content';
import Footer from './pages/components/layout/Footer/Footer';
import './App.css';

const App = props => (
  <div className="App">
    <Header title="Cyber Mart" />

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
