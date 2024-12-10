import express from 'express';
import { createOrder, getAllOrdersByUser } from './orderController.js';
import { protect } from '../../authMiddleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
// Create a new order
router.post('/create', createOrder);

// Get all orders for a specific user
router.get('/',  getAllOrdersByUser);

export default router;
