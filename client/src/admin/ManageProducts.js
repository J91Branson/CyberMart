//Import Package
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-primary">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Content className="container-fluid">
           <div className="row justify-content-center">
                <div className="col-6" >
                    <h3 className="text-center mt-5">
                        Total {products.length} Products in Inventory
                    </h3>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-primary badge-pill ml-3">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill ml-3"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                    {goBack()}
                </div>
            </div>
        </Content>
    );
};

export default ManageProducts;
