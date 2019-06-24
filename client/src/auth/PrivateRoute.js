import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

// Dashboard/ signup page will be displayed based on users authentication (token & email match -- auth/index.js) 
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
