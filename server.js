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
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
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

