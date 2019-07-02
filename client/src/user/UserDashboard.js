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
    const {user: { _id, name, email, role }} = isAuthenticated();
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
                    <h4>User Links</h4>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                       <li className="list-group-item">
                        <Link className="nav-link" to="/cart" style={{ color: "white" }>
                            <u>My Cart</u>
                        </Link>
                      </li>
                       <li className="list-group-item">
                        <Link className="nav-link" style={{ color: "white" } to={`/profile/${_id}`}>
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

    const purchaseHistory = history => {
        return (
            <div className="card-container4">
                <div className="cardA card2 mb-5">
                    <h3>Purchase history</h3>
                    <hr className="adminHr1" />
                    <ul className="list-group">
                      <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
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
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Content>
    );
};

export default Dashboard;
