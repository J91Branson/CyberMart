//Import Packages
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getCart } from "./cartStorage";
import Card from "../layouts/Content/Card";
import Checkout from "./Checkout";
import './cart.css';

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
                <h2>You have {`${items.length}`} product(s) in your cart.</h2>
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
            Your cart is empty. <br /> <Link className= "mt-2" to="/shop">Continue shopping <i className="fas fa-shopping-bag"></i></Link>
        </h2>
    );

    const goBack = () => (
        <div className="mt-5">
            <Link to="/shop" className="text-primary">
                Back to shopping page
            </Link>
        </div>
    );

    // Page render
    return (
        <Content className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-sm-6 mt-5">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-md-6 col-sm-6">
                    <br className="cartB"/><br className="cartB"/>
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
            {goBack()}
        </Content >
    );
};

export default Cart;
