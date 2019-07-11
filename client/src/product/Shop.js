// Import React Packages
import React, { useState, useEffect } from "react";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { getCategories, getFilteredProducts } from "./apiProduct";
import { prices } from "./priceRange";
import Search from "./Search";
import Card from "../layouts/Content/Card";
import Checkbox from "../layouts/Content/Checkbox";
import RadioBox from "../layouts/Content/RadioBox";
import './shop.css';

const Shop = () => {
    //State hooks
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [], animal: [] }
    });
    const [categories, setCategories] = useState([]);
    const [animalCat, setAnimalCat] = useState([{
        "_id" : "5d2186fd60c170bf8de79896",
        "name" : "Dog"
    },
    {
        "_id" : "5d2186e860c170bf8de79881",
        "name" : "Cat"
    }]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
            });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters)
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
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
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
                <button onClick={loadMore} className="btn btn-warning mb-5" style={{ float: "left", margin: "0px 0px 0px 30%" }}>
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
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

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
            <br/>
            <br/>
            <br/>
            <br/>
            <Search />
            <div className="row">
                <div className="col-3">
                    <h4>Filter by Animal</h4>
                    <ul>
                        <Checkbox
                            categories={animalCat}
                            handleFilters={filters =>
                                handleFilters(filters, "animal")
                            }
                        />
                    </ul>
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
                    <h2 className="mb-4">Products</h2><hr />
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-md-3 col-sm-3 mb-3">
                                <hr className="shopHr" />
                                <Card product={product} showProductDescription={false} />
                                <hr className="shopHr" />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Content>
    );
};


export default Shop;
