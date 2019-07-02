//React Package Imports ...hooks for function components
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { createProduct, getCategories } from "./apiAdmin";
import Axios from "axios";

//Component for admin user to add new products to database 
const Scraping = () => {

    //Hook to 
    const [values, setValues] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        size: "",
        url: "",
        sold: "",
        categories: [],
        category: "",
        quantity: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();

    const {
        name,
        image,
        description,
        price,
        size,
        sold,
        url,
        allPrices,
        categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // Imports all categories from database to insert into form drop down
    const init = () => {
        getCategories()
            .then(data => {
                if (error) {
                    setValues({ ...values, error: error });
                } else {
                    setValues({
                        ...values,
                        categories: data,
                        formData: new FormData()
                    });
                }
            });
    };

    //Using react hook to send all form input to server 
    //The above FormData() object will be populated with the form's current keys/values using the name property of each element for the keys and their submitted value for the values.
    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        Axios.get("/scrape/" + url)
            .then(res => {
                const scrape = res.data;
                formData.set("price", scrape.price);
                formData.set("quantity", scrape.quantity);
                formData.set("sold", scrape.sold);
                formData.set("allPrices", scrape.allPrices);
                formData.set("name", res.data.name);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setValues({ ...values, error: "", loading: true });
            })
            .finally(function () {
                createProduct(user._id, token, formData)
                    .then(data => {
                        if (data.error) {
                            setValues({ ...values, error: data.error });
                        } else {
                            setValues({
                                ...values,
                                name: "",
                                image: "",
                                description: "",
                                price: "",
                                quantity: "",
                                loading: false,
                                createdProduct: data.name
                            });
                        }
                    })
            })

        };

        const newPostForm = () => (

            <form className="mb-3" onSubmit={clickSubmit}>

                <div className="form-group">
                    <label className="text-muted">Url Code</label>
                    <input
                        onChange={handleChange("url")}
                        type="text"
                        className="form-control"
                        value={url}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Image Url</label>
                    <input
                        onChange={handleChange("image")}
                        type="text"
                        className="form-control"
                        value={image}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Size</label>
                    <input
                        onChange={handleChange("size")}
                        type="text"
                        className="form-control"
                        value={size}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <input
                        onChange={handleChange("description")}
                        type="text"
                        className="form-control"
                        value={description}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select
                        onChange={handleChange("category")}
                        className="form-control"
                    >
                        <option>Please select ...</option>
                        {categories &&
                            categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
                </div>

                <button className="btn btn-outline-primary">Scrape Product</button>

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
                <h2>{`${createdProduct}`} is created!</h2>
            </div>
        );

        const showLoading = () =>
            loading && (
                <div className="alert alert-success">
                    <h2>Loading...</h2>
                </div>
            );

        const goBack = () => (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">
                    Back to Dashboard
            </Link>
            </div>
        );

        return (
            <Content>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showLoading()}
                        {showSuccess()}
                        {showError()}
                        {newPostForm()}
                        {goBack()}
                    </div>
                </div>
            </Content>
        );
    };

    export default Scraping;
