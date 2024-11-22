const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Image: { type: String, required: true },
    Price: { type: String, required: true },
    available: { type: Boolean, required: true },
    Description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema, 'product');

module.exports = Product;