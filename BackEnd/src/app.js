import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto  from 'crypto';

import connectDB from './config/db.js';
import swaggerUi from 'swagger-ui-express'
import userRoutes from './features/users/userRoutes.js';
import swaggerDefinition from './config/swagger.js';
import cartRoutes from './features/cart/cartRoutes.js'
import orderRoutes from './features/order/orderRoutes.js'

dotenv.config();
connectDB();
const app = express();
const corsOptions = {
    origin: [process.env.FRONT_END_URL] , // Allow only a specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'], // Allow specific HTTP methods
    credentials: true, // Allow cookies or other credentials
  };
  
  // Apply CORS middleware with options
  app.use(cors());
  
app.use(express.json());
// Feature routes
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition,{ customCssUrl: CSS_URL }));

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to backend");
})

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Route
app.post("/create-order", async (req, res) => {
  try {
      const options = {
          amount: req.body.amount * 100, // Convert to paisa
          currency: "INR",
          receipt: `receipt_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Verify Payment Route
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

  if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
  } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
  }
});



app.use((req,res)=>{
    res.status(400).send("Url does not exist! ")
})
app.use((err,req,res,next)=>{
    res.status(500).send('Something went Wrong !')
})

export default app;
