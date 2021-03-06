// Import Packages
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

// Import Files/Components
import { addItem, updateItem, removeItem } from "../../cart/cartStorage";
import './shop.css';

const imgStyle = {maxWidth: "50%"};


const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    showProductDescription = false,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-primary login_btn expandBtn mt-2 mb-2">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-warning mt-2 mb-2"
                >
                    <i className="far fa-shopping-cart"></i>
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
                <span className="badge badge-primary badge-pill">Out of Stock</span>
            );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    const showDescription = showProductDescription => {
        return (
            showProductDescription && (
                <p className="lead mt-2">
                    {product.description.substring(0, 100)}
                </p>
            )
        );
    };

    return (
        <div className="card cardS">
            <div className="card-body">
                {shouldRedirect(redirect)}
                <img style = {imgStyle}src={product.image} alt="Product" />
                <h3>
                    {product.name}   
                </h3>
                {showDescription(showProductDescription)}             
                <p className="black-10">Price: ${product.price}</p>
                <p className="black-9">
                    Category: {product.category && product.category.name}
                </p>
                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;
