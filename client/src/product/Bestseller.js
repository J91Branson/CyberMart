// Import React Packages
import React, { useState, useEffect } from "react";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getProductsbyAn } from "./apiProduct";
import Card from "../layouts/Content/Card";

//Page that shows bestsellers for xxxx
const Bestseller = (props) => {

    //State hooks
    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError] = useState(false);

    // Uses sold count from database to render bestsellers
    const loadProductsBySell = () => {
        getProductsbyAn(props.code, "sold")
            .then(data => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                    console.log(error);
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
            <h2 className="mb-4">Most Popular {props.animal} Items</h2>
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
