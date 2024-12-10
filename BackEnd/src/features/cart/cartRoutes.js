import express from 'express';
import { addToCart, reduceCartQuantityByOne, removeFromCart,getCartItems } from './cartController.js';
import { protect } from '../../authMiddleware/authMiddleware.js';
const router = express.Router();


router.use(protect);
// Add to cart
router.post('/add', addToCart);

// Reduce quantity by one
router.post('/reduce', reduceCartQuantityByOne);

// Remove from cart
router.post('/remove', removeFromCart);

// Get all cart items for a specific user
router.get('/', getCartItems);

export default router;
