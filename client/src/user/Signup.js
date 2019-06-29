// Import React Packages
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { signup } from "../auth/apiAuth";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="row signInF">
        <div className="col-md-6 col-sm-6">
            <div className="card signInC  swing-in-left-bck">
                <div className="card-header signInH text-center">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i class="fas fa-tag"> Name</i></span>
                            </div>
                            <input
                                onChange={handleChange("name")}
                                type="text"
                                className="form-control"
                                value={name}
                            />
                        </div>
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
            <div className="card signInC  swing-in-right-bck">
                <div className="card-header signInH text-center">
                    <h3>Already a Customer?</h3>
                </div>
                <div className="card-body">
                    <p className="card-text">If you are already a customer wishing to sign into your account click below!</p>
                    <a href="/signup" className="btn btn-primary login_btn"><i class="fas fa-sign-in-alt"></i> Sign In</a>
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

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Content className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Content>
    );
};

export default Signup;
