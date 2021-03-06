// Import React Packages
import React, { useState, useEffect } from "react";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getCategories, getFilteredAnProducts, getFilteredProducts} from "./apiProduct";
import { prices } from "./priceRange";
import Search from "./Search";
import Card from "../layouts/Content/Card";
import Checkbox from "../layouts/Content/Checkbox";
import RadioBox from "../layouts/Content/RadioBox";
import './shop.css';

const Shop = (props) => {
     //State hooks
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [], animal: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [animal, setAnimal] = useState(props.code);

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
        });
        console.log(animal);
    };

    const loadFilteredResults = newFilters => {
        getFilteredAnProducts( animal, skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults(data.data);
                    setSize(data.size);
                    setSkip(0);
                }
            });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredAnProducts(animal, toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5" style={{float: "left", margin: "0px 0px 0px 30%"}}>
                    Load more
                </button>
            )
        );
    };

    //Mount hook
    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);


    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        console.log(newFilters);

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };


    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    // Page render
    return (
        <Content className="container-fluid" >
            <Search />
            <div className="row">
                <div className="col-3">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-9">
                    <h2 className="mb-4">{props.animal} Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-3 mb-3">
                                <Card product={product} showProductDescription={false} />
                            </div>
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Content>
    );
};


export default Shop;
