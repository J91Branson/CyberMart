// Import React Packages
import React from "react";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { Link } from "react-router-dom";
import './admin.css';

const AdminDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card-container2">
                <div className="cardA card1">
                    <h4>Links</h4>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                        <li>
                            <Link className="nav-link" to="/create/category" style={{ color: "black" }}>
                                <u>Create Category</u>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/create/product" style={{ color: "black" }}>
                                <u>Create Product</u>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin/order" style={{ color: "black" }}>
                                <u>View Orders</u>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin/products" style={{ color: "black" }}>
                                <u>Manage Products</u>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin/J3LNkv3lXB" style={{ color: "black" }}>
                                <u>Scrape Products</u>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card-container">
                <div className="cardA card2">
                    <h3 style={{ color: "black" }}>User Information</h3>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                        <li>{name}</li>
                        <hr className="adminHr2" />
                        <li>{email}</li>
                        <hr className="adminHr2" />
                        <li>
                            {role === 1 ? "Admin" : "Registered User"}
                        </li>
                    </ul></div>
            </div>

        );
    };

    return (
        <Content className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-sm-3">{adminLinks()}</div>
                <div className="col-md-9 col-sm-9">{adminInfo()}</div>
            </div>
        </Content>
    );
};

export default AdminDashboard;
