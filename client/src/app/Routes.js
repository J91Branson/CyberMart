// Import React Packages
import React from 'react';
import {  Switch, Route } from "react-router-dom";

// Import Files/Components
import App from './App'; //Parent route for page rendering and layout 

//Website page routes
import Home from '../pages/Home/Home';  //Home page
import About from '../pages/About/About'; //About page
import Contact from '../pages/Contact/Contact'; //Contact page
import Shop from '../product/Shop'; //Product page
import Product from "../product/Product"; //customer
import Cart from "../cart/Cart"; //customer
import Error404 from '../pages/Error/404'; //Error page

//User routes
import Signup from '../user/Signup';  //customer
import Signin from '../user/Signin';  //customer/admin
import Dashboard from "../user/UserDashboard"; //customer
import AdminDashboard from "../user/AdminDashboard"; //admin
import Profile from "../user/Profile"; //customer


//Authentication routes
import PrivateRoute from "../auth/PrivateRoute";  //customer
import AdminRoute from "../auth/AdminRoute"; //admin

//Admin routes  (to admin pages to view, make changes to products/category/orders)
import AddCategory from "../admin/AddCategory"; //admin
import AddProduct from "../admin/AddProduct";  //admin
import Scrape from "../admin/Scrape"; //admin
import Orders from "../admin/Order"; //admin
import ManageProducts from "../admin/ManageProducts"; //admin
import UpdateProduct from "../admin/UpdateProduct"; //adminS

//Links on nav menu and links on dashboards
const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/contact" component={Contact} exact />
      <Route path="/shop" component={Shop} exact />
      <Route path="/cart" exact component={Cart} />
      <Route path="/product/:productId" exact component={Product} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
      <PrivateRoute path="/profile/:userId" exact component={Profile}/>
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
      <AdminRoute path="/create/category" exact component={AddCategory}/>
      <AdminRoute path="/create/product" exact component={AddProduct}/>
      <AdminRoute path="/admin/J3LNkv3lXB" exact component={Scrape}/>    
      <AdminRoute path="/admin/order" exact component={Orders}/>
      <AdminRoute  path="/admin/products" exact component={ManageProducts}/>
      <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
