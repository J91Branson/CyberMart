import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#000000" };
  }
};


const Menu = ({ history }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">CyberMart</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">

        <li className="nav-item active">
          <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
        </li>

        <li className="nav-item active">
          <Link className="nav-link" style={isActive(history, "/contact")} to="/contact">Contact</Link>
        </li>

        <li className="nav-item active">
          <Link className="nav-link" style={isActive(history, "/about")} to="/about">About</Link>
        </li>

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

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item active">
              <Link className="nav-link" style={isActive(history, "/signin")} to="/signin"><button>Log In</button></Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" style={isActive(history, "/signup")} to="/signup"><button>Sign Up</button></Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item active">
            <button><span
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

