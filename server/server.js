// server.js
const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require('./routes/productRoutes'); 
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
dotEnv.config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json()); 

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, './../assignment2-ravishankarbhange/build')));

// Handle other routes by sending the React index.html
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './../assignment2-ravishankarbhange/build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb connected..!!");
    })
    .catch((error) => {
        console.log("Error", error);
    });

// Use product, wishlist and cart routes
app.use('/api/products', productRoutes); 
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
