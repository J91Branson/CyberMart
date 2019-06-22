import React from "react";

const Content = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
      
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
   
);

export default Content;
