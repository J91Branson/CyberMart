// api route to sign up new user
export const signup = user => {
    return fetch("/api/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

// api route to sign in user
export const signin = user => {
    return fetch(`/api/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

//saves token to local storage
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

//removes token to local storage
export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
        return fetch(`/api/signout`, {
            method: "GET"
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => console.log(err));
    }
};

//shows/hides specific menu links based on token local storage
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};
