// Import React Packages
import React, { useState, useEffect } from "react";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getProducts } from "./apiProduct";
import Card from "../layouts/Content/Card";

//Page that shows bestsellers for xxxx
const Bestseller = () => {

    //State hooks
    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError] = useState(false);

    // Uses sold count from database to render bestsellers
    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    //Mount hook
    useEffect(() => {
        loadProductsBySell();
    }, []);

     // Page render
    return (
        <Content className="container-fluid">
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Content>
    );
};

export default Bestseller;
