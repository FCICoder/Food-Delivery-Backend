import express from 'express';
import cors from 'cors';

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})