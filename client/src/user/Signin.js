// Import React Packages
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { signin, authenticate, isAuthenticated } from "../auth/apiAuth";
import './signin.css';

const Signin = () => {
    const [values, setValues] = useState({
        email: "customer@g.com",
        password: "password1",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (error) {
                setValues({ ...values, error: error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signInForm = () => (
        <div className="row signInF">
        <div className="col-md-6 col-sm-6">
            <div className="cardA card2 signInC  swing-in-left-bck">
                <div className="signInH text-center">
                    <h3>Sign In</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-paw"> Email</i></span>
                            </div>
                            <input
                                onChange={handleChange("email")}
                                type="email"
                                className="form-control"
                                value={email}
                            />
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"> Password</i></span>
                            </div>
                            <input
                                onChange={handleChange("password")}
                                type="password"
                                className="form-control"
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={clickSubmit} className="btn btn-primary login_btn">
                                Submit
                             </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-sm-6">
            <div className="cardA card2 signInC  swing-in-right-bck">
                <div className="signInH text-center">
                    <h3>New Customer?</h3>
                </div>
                <div className="card-body">
                    <p className="card-text">If you are a new customer wishing to create an account click below!</p>
                    <Link className="nav-link" to="/signup"><button className="login_btn btn btn-primary">Sign Up</button></Link>
                </div>
            </div>
        </div>
    </div>

    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );


    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/shop" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };


    return (
        <Content
            // Text on Jumbotron related to this page --layouts/Content.js
            title="Signin"
            description="Please sign into your account"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Content>
    );
};

export default Signin;