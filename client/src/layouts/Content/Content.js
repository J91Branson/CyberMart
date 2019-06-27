// Import React Packages
import React from "react";

const Content = ({
    className,
    children
}) => (
    <div>
        <div className={className}>{children}</div>
    </div>
   
);

export default Content;
