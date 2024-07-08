import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
//! App Configuration
const app = express();
const port = 4000;

//! Middlewares
app.use(cors({
    origin:'*'
}));

//! Routes
app.get('/', (req , res) =>{
    res.send('Api Working');
})

// ! api endpoint
app.use("/api/food",foodRouter);
app.use('/images' , express.static('uploads'));
app.use('/api/user' , userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

//! Db Connection
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

