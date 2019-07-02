//Import Packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getCart } from "./cartStorage";
import Card from "../layouts/Content/Card";
import Checkout from "./Checkout";

// Cart page to review selected items on left and checkout on right
const Cart = () => {

    //State hooks
    const [items, setItems] = useState([]);

    //Mount hook
    useEffect(() => {
        setItems(getCart());
    }, [items]);

    //Returns all items that were added to the cart
    const showItems = items => {
        return (
            <div>
                <h2>You have {`${items.length}`} products in your cart.</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        );
    };

    //Message if cart is empty
    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    const goBack = () => (
        <div className="mt-5">
            <Link to="/shop" className="text-warning">
                Back to shopping page
            </Link>
        </div>
    );

    // Page render
    return (
        <Content className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
            {goBack()}
        </Content >
    );
};

export default Cart;
