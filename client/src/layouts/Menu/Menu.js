// Import React Packages
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// import Search from "../../product/Search";

// Import Files/Components
import { signout, isAuthenticated } from "../../auth/apiAuth";
import { itemTotal } from "../../cart/cartStorage";
import './Menu.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FFB6B6" };
  } else {
    return { color: "#000000" };
  }
};

const ImageStyle={height:"50px"};

const Menu = ({ history }) => (
  <nav className="navbar navbar-expand-lg nav-style">
    <a className="navbar-brand" href="/"><img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/PB_logo.png"}/></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">

        {/* page links */}
        <li className="nav-item active">
          <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
        </li>

        <li className="nav-item active">
          <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Shop</Link>
        </li>
        {/* <Search/> */}
        {/* button links */}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item active">
            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item active">
            <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
      
      <ul className="navbar-nav ml-auto">
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/cart")}
              to="/cart"
            >
              <i className="fas fa-shopping-cart" style={{ color: "black" }}></i>{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item active">
              <Link className="nav-link" style={isActive(history, "/signin")} to="/signin"><button className="login_btn btn btn-primary">Log In</button></Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" style={isActive(history, "/signup")} to="/signup"><button className="login_btn btn btn-primary">Sign Up</button></Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item active ml-auto">
            <button className="login_btn btn btn-primary"><span
              style={{ cursor: "pointer", color: "#000000" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >Log Out</span></button>
          </li>
        )}
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);

