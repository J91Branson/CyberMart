// Import React Packages
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Import Files/Components
import './index.css';

// Routes
import AppRoutes from './app/Routes';

render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root')
);