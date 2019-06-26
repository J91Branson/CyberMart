//Packages Imports
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//File Imports
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

// To add new product to database
exports.create = (req, res) => {

    //Handles photo import 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        //Error handling for image and data field upload
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        //Variables for each data input for fields
        const { name, description, price, category, quantity, shipping } = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //Variable to create new Product 
        let product = new Product(fields);

              //Photo file size limitation
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            // 1kb = 1000
            // 1mb = 1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

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
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

//Takes returned product response above (excl. photo) and display it
exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};


// To update existing product
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
         //Error handling for image and data field upload
         if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        //Variables for each data input for fields
        const { name, description, price, category, quantity, shipping } = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //Variable for existing product and to replace it with new input
        let product = req.product;
        product = _.extend(product, fields);

        //Photo file size limitation
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            // 1kb = 1000
            // 1mb = 1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

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

//Takes returned product output above (excl. photo) to deletes it
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