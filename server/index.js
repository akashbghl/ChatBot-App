import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from 'cors'
// import mongoose from 'mongoose';
import routex from './routes/routex.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',routex);

// mongoose.connect(process.env.MONGO_URI).then((req,res)=>{
//     console.log('✅mongoDb connected successfully');
//     res.status(200).json({message:'Connected'});
// }).catch((error)=>{
//     console.error("❌ mongoDB connection failed\n",error);
// })

const PORT  = process.env.PORT || 8000;
app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})