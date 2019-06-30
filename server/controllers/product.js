//Packages Imports
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//File Imports
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

// To add new product to database
exports.create = (req, res) => {

    //Handles image import 
    let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        //Error handling for image and data field upload
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        //Variables for each data input for fields
        const { name, description, price, category, quantity, image } = fields;
        if (!name || !description || !price || !category || !quantity || !image) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //Variable to create new Product 
        let product = new Product(fields);

        //Save new product to database
        product.save((err, result) => {
            if (err) {
                return res.staus(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

//To finds a specific product
exports.productById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

//Takes returned product response above (excl. image) and display it
exports.read = (req, res) => {
    // req.product.image = undefined;
    return res.json(req.product);
};


// To update existing product
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        //Error handling for image and data field upload
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        //Variables for each data input for fields
        const { name, description, price, category, quantity, image } = fields;
        if (!name || !description || !price || !category || !quantity || !image) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //Variable for existing product and to replace it with new input
        let product = req.product;
        product = _.extend(product, fields);
    });
};

//Takes returned product output above (excl. image) to deletes it
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted successfully"
        });
    });
};

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
        // assigne category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        });
    }
};

//Displays all products
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};

//Displays all product related to this current product (excl. current product)
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    // ne - not included
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};

//Displays all products' categories
exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
};


//Displays products by search
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
