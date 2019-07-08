// Import React Packages
import React, { useState, useEffect } from "react";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getProductsbyAn } from "./apiProduct";
import Card from "../layouts/Content/Card";
const ImageStyle={maxWidth: '480px'};
//Page that shows bestsellers for xxxx
const Bestseller = (props) => {

    //State hooks
    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError] = useState(false);

    // Uses sold count from database to render bestsellers
    const loadProductsBySell = () => {
        getProductsbyAn(props.code, "sold")
            .then(data => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                    console.log(error);
                } else {
                    setProductsBySell(data);
                }
            });
    };

    //Mount hook
    useEffect(() => {
        loadProductsBySell();
    }, []);

    // Page render
    return (
        <Content className="container-fluid">
            <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/updatebestsellers.png"}/>
            {/* <h2 className="mb-4">Most Popular {props.animal} Items</h2> */}
            {/* <div className="row"><div className="col-md-12 col-sm-12" style={{zIndex: '-1'}}><img style={{maxWidth: '480px'}} src="https://playnstaypetcamp.com/wp-content/uploads/2017/05/iStock-dogs-hanging-over-edge.jpg"></img></div></div> */}
            {/* <h2 className="mb-4 bestSellerH">Best Sellers</h2> */}
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-md-3 col-sm-3 mb-3">
                        <hr className="shopHr" />
                        <Card product={product} />
                        <hr className="shopHr" />
                    </div>
                ))}
            </div>
        </Content>
    );
};

export default Bestseller;
