//Packages Imports
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            // maxlength: 32
        },
           image: {
            type: String,
            trim: true,
            required: true,
            // maxlength: 150
        },
        description: {
            type: String,
            trim: true,
            required: true,
            // maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        animal: {
            type:ObjectId,
            ref: "Animal",
            required: true
        },
        quantity: {
            trim: true,
            type: Number,
            default: 0,
            required: true
        },
        sold: {
            type: Number,
            default: 0
        },
        url : {
            type: String,
        },
        size: {
            type: String,
        },
        allPrices: [{}]
        // shipping: {
        //     required: true,
        //     default: true,
        //     type: Boolean
        // }
    },
    { timestamps: {type: Date, default: Date.now} }
);

module.exports = mongoose.model("Product", productSchema);
