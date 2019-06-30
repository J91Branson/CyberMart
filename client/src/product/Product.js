import React, { useState, useEffect } from "react";
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
        <Content
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}
                </div>

                <div className="col-4">
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
