const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { id, Name, Image, Price, available, Description } = req.body;

        // Create a new product document
        const newProduct = new Product({
            id,
            Name,
            Image,
            Price,
            available,
            Description
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};