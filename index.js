import express from 'express';
import cors from 'cors';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import mongoose from 'mongoose';


//! App Configuration
const app = express();
const port = 3333;

//! Middlewares
app.use(cors({
    origin:'*',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.options('',cors({
    origin:'*',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

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



mongoose.connect('mongodb+srv://mahmoudaadel1998:kdcuOl32KmKTmC2x@cluster0.nyxvxll.mongodb.net/food-del').then(()=>{
    console.log('Conected to Mongo DB Successefully');
}).catch((err)=>{
    console.log(err);
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

