//Import Package
import React, { useState, useEffect } from "react";
import moment from "moment";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            console.log(data)
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="mt-5">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Content>
             <div className="row">
                <div className="col-md-6 offset-md-3">
                    
                    {showOrdersLength()}

                    {orders.map((o, i) => {
                        return (
                            <div className="card">
                            <div
                                className="mt-5"
                                key={i}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-black" style={{ color: "#00aeef" }}>
                                        Order ID: {o._id}
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4"style={{ color: "#00aeef" }}>
                                    Total Items In Order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "15px",
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                            </div>
                        );
                        
                    })}
                    </div>
              
            </div>
        </Content>
    );
};

export default Orders;
