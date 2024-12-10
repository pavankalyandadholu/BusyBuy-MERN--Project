import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  productAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  productName: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderCreatedAt: { type: Date, default: Date.now },
  items: [itemSchema],
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
