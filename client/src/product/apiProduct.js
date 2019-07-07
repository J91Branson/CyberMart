// Import Packages
import queryString from "query-string";

//GET METHODS
//route to display all products
export const getProducts = sortBy => {
    return fetch(`/api/products?sortBy=${sortBy}&order=desc&limit=4`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//route to display all categories
export const getCategories = () => {
    return fetch(`/api/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//route to display all products searched
export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`/api/products?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//route to display all products under designated animal category
export const getProductsbyAn = (animal, sortBy) => {
    return fetch(`/api/products/${animal}?&sortBy=${sortBy}&order=desc&limit=4`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//route to display a product
export const read = productId => {
    return fetch(`/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//route to display all related products 
export const listRelated = productId => {
    return fetch(`/api/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//POST METHODS
//route to display all products in search
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`/api/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)        
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
