// Import React Packages
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Import Files/Components
import { isAuthenticated } from "./apiAuth";

//Admin Route renders all components related to the admin role
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;
