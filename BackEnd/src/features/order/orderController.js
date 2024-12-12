import Order from './orderModel.js';
import Cart from '../cart/cartModel.js';
// Create a new order
export const createOrder = async (req, res) => {
  
    try {   
  
      // Fetch cart items for the user
      const userId = req.user._id;
      const cartItems = await Cart.find({ user: userId })
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty, cannot create an order' });
      }
  
      // Transform cart items into order items
      const orderItems = cartItems.map(item => ({
        quantity: item.itemQuantity,
        productAmount: item.productDetails.price, 
        totalAmount: item.itemQuantity * item.productDetails.price,
        productName: item.productDetails.title, 
      }));
  
      // Create the order
      const order = new Order({
        user: userId,
        items: orderItems,
      });
      await order.save();
  
      // Remove items from the cart
      await Cart.deleteMany({ user: userId });
  
      
  
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
     
      res.status(500).json({ message: error.message });
    }
  };

// Get all orders for a specific user
export const getAllOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
  .populate('user', 'email')
  .sort({ createdAt: -1 }); // Sorts by createdAt in descending order


    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
