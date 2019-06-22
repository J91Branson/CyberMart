// Dependencies
import React from 'react';
import {  Switch, Route } from "react-router-dom";

// Components
import App from './App';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Signup from './users/SignUp/SignUp';
import Signin from './users/SignIn/SignIn';
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./users/Dashboard/UserDashboard";
import Error404 from './pages/Error/404';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/contact" component={Contact} exact />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
