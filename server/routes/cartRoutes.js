const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/', cartController.addToCart);
router.put('/:productId', cartController.updateCartQuantity);
router.delete('/:id', cartController.removeFromCart);
router.get('/', cartController.getCart);


module.exports = router;