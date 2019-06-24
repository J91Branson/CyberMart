// Dependencies
import React from 'react';
import {  Switch, Route } from "react-router-dom";

// Components
import App from './App';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Signup from '../user/Signup';
import Signin from '../user/Signin';
import PrivateRoute from "../auth/PrivateRoute";
import Dashboard from "../user/UserDashboard";
import AdminRoute from "../auth/AdminRoute";
import AdminDashboard from "../user/AdminDashboard";
import Error404 from '../pages/Error/404';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/contact" component={Contact} exact />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
