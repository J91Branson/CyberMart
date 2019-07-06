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
        getProducts("sold")
            .then(data => {
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
            <div className="row"><div className="col-md-12 col-sm-12" style={{zIndex: '-1'}}><img style={{maxWidth: '490px'}} src="https://playnstaypetcamp.com/wp-content/uploads/2017/05/iStock-dogs-hanging-over-edge.jpg"></img></div></div>
            <h2 className="mb-4 bestSellerH">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-md-3 col-sm-3 mb-3">
                        <hr className="shopHr" />
                        <Card product={product} />
                        <hr className="shopHr" />
                    </div>
                ))}
            </div>
        </Content>
    );
};

export default Bestseller;
