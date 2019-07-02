//Import Package
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";


// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";


const UpdateProduct = ({ match }) => {
    const [categories, setCategories] = useState([])
    const [values, setValues] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        categories: [],
        category: "",
        quantity: "",
        loading: false,
        error: false,
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        image,
        price,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //loads specific product
    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    price: data.price,
                    category: data.category._id,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setCategories(data); 
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(
            data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        image: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        error: false,
                        redirectToProfile: true,
                        createdProduct: data.name
                    });
                }
            }
        );
    };

    const updateProductForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
        
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Image</label>
                <textarea
                    onChange={handleChange("image")}
                    className="form-control"
                    value={image}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/dashboard" />;
            }
        }
    };

    return (
        <Content>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {updateProductForm()}
                    {redirectUser()}
                </div>
            </div>
        </Content>
    );
};

export default UpdateProduct;
