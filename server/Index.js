import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { test } from './controllers/user.controller';
dotenv.config();

mongoose
.connect(
    process.env.MONGO
)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {console.log(err)})



const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

app.listen(3000,() =>{
    console.log('Server listening on port 3000');
})
app.get('/test',test)