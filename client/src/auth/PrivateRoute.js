// Import React Packages
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Import Files/Components
import { isAuthenticated } from "./apiAuth";

//Private Route renders all components related to the customer role
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated()
                ? (<Component {...props} />)
                : (<Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
                )
        }
    />
);

export default PrivateRoute;
