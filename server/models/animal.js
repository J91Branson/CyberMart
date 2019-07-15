const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }
    },
    { timestamps: {type: Date, default: Date.now} }
);

module.exports = mongoose.model("Animal", animalSchema);
