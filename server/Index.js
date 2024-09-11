import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
dotenv.config();

// Connect to MongoDB database
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



app.use('/api/auth',userRoutes)

app.use('/api/auth',authRoutes)


app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server Error';
    res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})