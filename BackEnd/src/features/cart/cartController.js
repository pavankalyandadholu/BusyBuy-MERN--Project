import Cart from './cartModel.js';


// Get all cart items for a specific user
export const getCartItems = async (req, res) => {
    const  userId = req.user._id;
  
    try {
      const cartItems = await Cart.find({ user: userId }).populate('user', 'email'); // Populate user details if needed
      if (cartItems.length === 0) {
        return res.status(404).json({ message: 'No items found in the cart' });
      }
      res.status(200).json({ cartItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Add a product to the cart
export const addToCart = async (req, res) => {
  const   productDetails  = req.body.product;
  const  userId = req.user._id;
  try {
    // Check if the item already exists in the cart
    const existingCartItem = await Cart.findOne({ user: userId, 'productDetails.id': productDetails.id });

    if (existingCartItem) {
      // Update the quantity if the item is already in the cart
      existingCartItem.itemQuantity += 1;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Cart updated successfully', cart: existingCartItem });
    }

    // Add a new item to the cart
    const cartItem = await Cart.create({ user: userId, productDetails });
    res.status(201).json({ message: 'Item added to cart', cart: cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reduce the quantity of a cart item by one
export const reduceCartQuantityByOne = async (req, res) => {
  const {  productId } = req.body;
  const  userId = req.user._id;
  try {
    const cartItem = await Cart.findOne({ user: userId, 'productDetails.id': productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (cartItem.itemQuantity > 1) {
      cartItem.itemQuantity -= 1;
      await cartItem.save();
      return res.status(200).json({ message: 'Cart quantity reduced', cart: cartItem });
    } else {
      // Remove the item if the quantity becomes 0
      await Cart.findByIdAndDelete(cartItem._id);
      return res.status(200).json({ message: 'Item removed from cart',cart: cartItem });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const {  productId } = req.body;
  const  userId = req.user._id;
  try {
    const cartItem = await Cart.findOneAndDelete({ user: userId, 'productDetails.id': productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart',product:cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
