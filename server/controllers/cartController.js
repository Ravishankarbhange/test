const Cart = require('../models/Cart');

// To help of chatgpt for handling the JWT tokens

// Add to Cart
const jwt = require('jsonwebtoken');

exports.addToCart = async (req, res) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log("Token is: ", token);
        if (!token) return res.status(401).json({ message: 'Token missing' });

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        console.log("userID is :  ", userId);
        const { productId } = req.body;
        console.log("Checking the cart if product exists? ");
        // Check if product already exists in the cart
        const existingCartItem = await Cart.findOne({ userId, productId });

        if (existingCartItem) {
            console.log("In cart ");
            // Update quantity if it exists
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Cart updated', existingCartItem });
        } else {
            console.log("Not in cart ");
            // Create a new cart item
            const newCartItem = new Cart({ userId, productId, quantity: 1 });
            await newCartItem.save();
            return res.status(201).json({ message: 'Product added to cart', newCartItem });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding to cart', error });
    }
};


// Update Cart Quantity
exports.updateCartQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token missing' });

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Find the cart item by userId and productId
        const updatedCartItem = await Cart.findOneAndUpdate(
            { userId, productId },
            { quantity },
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart updated', updatedCartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};
// Remove from Cart
exports.removeFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token missing' });

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Try to remove the cart item by _id and userId
        const result = await Cart.deleteOne({ _id: id, userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error });
    }
};



// Get Cart
exports.getCart = async (req, res) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token missing' });

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch the cart items for the specific user
        const cartItems = await Cart.find({ userId }).populate('productId');
        
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No items in cart' });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};
