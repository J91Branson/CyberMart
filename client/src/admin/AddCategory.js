//Import Package
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { createCategory } from "./apiAdmin";

//Component for admin user to add new category to database 
const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");                
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group mt-5">
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-primary login_btn">Submit</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">The Category "{name}" was created.</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-primary">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Content>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    {showSuccess()}
                    {showError()}
                    <h3 className="mt-5">Add New Animal Category</h3>
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Content>
    );
};

export default AddCategory;
