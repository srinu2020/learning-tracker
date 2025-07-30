import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import groupRoutes from './routes/groupRoutes.js'
import goalRoutes from './routes/goalRoutes.js'
dotenv.config();
connectDB();
const app=express();
app.use(cors())
app.use(express.json())
app.get('/test', (req, res) => {
    res.send('API is working ✅');
  });
app.use('/api/auth',authRoutes)
app.use('/api/groups',groupRoutes)
app.use('/api/goals',goalRoutes)
const PORT=process.env.PORT||5000
app.listen(PORT,()=>console.log(`server running on port ${PORT}`)
)