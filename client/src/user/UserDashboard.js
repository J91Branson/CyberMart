// Import React Packages
import React from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";


const Dashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card-container3">
                <div className="cardA card1">
                    <h4>User Links</h4>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                        <li>
                            <Link className="nav-link" to="/cart" style={{ color: "white" }}>
                                <u>My Cart</u>
                        </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/profile/update" style={{ color: "white" }}>
                            <u>Update Profile</u>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card-container1">
                <div className="cardA card2 mb-5">
                    <h3>User Information</h3>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                        <li>{name}</li>
                        <hr className="adminHr2" />
                        <li>{email}</li>
                        <hr className="adminHr2" />
                        <li>
                            {role === 1 ? "Admin" : "Registered User"}
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    const purchaseHistory = () => {
        return (
            <div className="card-container4">
                <div className="cardA card2 mb-5">
                    <h3>Purchase history</h3>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                        <li>history</li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <Content className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Content>
    );
};

export default Dashboard;
