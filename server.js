import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

//! App Configuration
const app = express();
const port = 4000;

//! Middlewares
app.use(cors());
app.use(express.json());

//! Routes
app.get('/', (req , res) =>{
    res.send('Api Working');
})

// ! api endpoint
app.use("/api/food",foodRouter)
app.use('/images' , express.static('uploads'));

//! Db Connection
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

