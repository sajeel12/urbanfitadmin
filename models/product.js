const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name for your product"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please enter a price for your product"],
        maxlength: [10, "Price can't be more than 10 figures"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description for your product"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please enter a category for your product"]
    },
    slug: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    ratings: {
        type: Number,
        default: 0
    },
    variants: [
        {
            color: {
                type: String,
            },
            color_name: {type: String},
            images: [{
                public_id: { type: String, required: true },
                url: { type: String, required: true },
            }],
            size: {
                type: Array,
                default: ["M", "L"]
            },
            stock: {
                type: Number,
                required: [true, "Please enter stock of the product"],
                default: 1
            }
        }
    ],
    seo_detials: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        meta_keywords: { type: Array, required: true },
    },
    shipping_detials: {
        width: { type: String, required: true },
        height: { type: String, required: true },
        weight: { type: String, required: true },
        fees: { type: Number, required: true },
    }

}, { timestamps: true })

module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema)