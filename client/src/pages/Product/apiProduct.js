
export const getProducts = sortBy => {
    return fetch(`api/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`/api/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

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