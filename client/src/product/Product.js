// Import React Packages
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { read, listRelated } from "./apiProduct";
import Card from "../layouts/Content/Card";

//Returns data for a selected product on left and related products on the right
const Product = props => {

    //State hooks
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    //returns data for selected product on left and related products on the right
    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    //Mount hook
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    // Page render
    return (
        <Content className="container-fluid">
            <div className="row">
            <div className="col-2"><Link to="/shop"><i className="fas fa-arrow-left"></i> shop</Link></div>
                <div className="col-7">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} showProductDescription={true} />
                    )}
                </div>

                <div className="col-3">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Content>
    );
};

export default Product;
