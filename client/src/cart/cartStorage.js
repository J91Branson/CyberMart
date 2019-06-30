//saves items added to cart into local storage with token key "cart" and removes duplicates
export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count: 1
        });

        cart = Array
            .from(new Set(cart.map(p => p._id)))
            .map(id => {
                return cart.find(p => p._id === id);
            });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

//returns total items in cart from local storage
export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};

//returns all items in cart based on local storage token
export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

//updates quantity in local storage for item in cart
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

//removes deleted item in cart from local storage
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

//removes checkout items from local storage after payment was processed
export const emptyCart = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        next();
    }
};

