import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import swaggerUi from 'swagger-ui-express'
import userRoutes from './features/users/userRoutes.js';
import swaggerDefinition from './config/swagger.js';
// import productRoutes from './features/products/productRoutes.js';
// import orderRoutes from './features/orders/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Feature routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
app.use('/',(req,res)=>{
    res.status(200).send("Hello world")
})

export default app;
