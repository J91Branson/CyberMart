// Import React Packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { getPurchaseHistory } from "./apiUser";


const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const { user: { _id, name, email, role } } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);


    const userLinks = () => {
        return (
            <div className="card-container3">
                <div className="cardA card1">
                    <h4>Admin Links</h4>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                        <li>
                            <Link className="nav-link" to="/cart" style={{ color: "white" }}>
                                <u>My Cart</u>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" style={{ color: "white" }} to={`/profile/${_id}`}>
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
                <div className="cardA card2 ">
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

    const purchaseHistory = history => {
        return (
            <div className="card-container">
                <div className="mt-0">
                    <h3 style={{ color: "#00aeef" }}><bold>Purchase History</bold></h3>
                    <hr />
                    <ul className="list-group">
                        <li>
                            {history.map((h, i) => {
                                return (
                                    <div>
                                        {h.products.map((p, i) => {
                                            return (
                                                <div key={i}>
                                                    <h6>Product name: {p.name}</h6>
                                                    <h6>
                                                        Product price: ${p.price}
                                                    </h6>
                                                    <h6>
                                                        Purchased date:{" "}
                                                        {moment(p.createdAt).fromNow()}
                                                    </h6>
                                                    <br></br>
                                                </div>
                                            );
                                        })}
                                        <hr />
                                    </div>
                                );
                            })}
                        </li>
                    </ul>
                </div>
            </div>
        );
    };


    return (
        <Content className="container-fluid">
            <div className="row mt-5">
                <div className="col-md-3 col-sm-3">{userLinks()}</div>
                <div className="col-md-9 col-sm-9">{userInfo()}</div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3"></div>
                <div className="col-md-9 col-sm-9">
                    {purchaseHistory(history)}
                </div>
            </div>
        </Content >
    );
};

export default Dashboard;
