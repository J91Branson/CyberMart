import React from "react";

const Content = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <div className={className}>{children}</div>
    </div>
   
);

export default Content;
