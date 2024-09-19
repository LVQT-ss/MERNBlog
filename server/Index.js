import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();

// Connect to MongoDB database
mongoose
.connect(
    process.env.MONGO
)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {console.log(err)})


const __dirname = path.resolve();

const app = express();
// Middleware to parse JSON request bodies

app.use(express.json());
app.use(cookieParser());
app.listen(3000,() =>{
    console.log('Server listening on port 3000');
})



app.use('/api/user',userRoutes)

app.use('/api/auth',authRoutes)

app.use('/api/post',postRoutes)

app.use('/api/comment',commentRoutes)


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });


app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server Error';
    res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})

