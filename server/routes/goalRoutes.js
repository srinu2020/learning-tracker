import express from 'express'
import { addGoal,getGoals } from '../controllers/goalController.js'
import { protect } from '../middleware/authMiddleware.js'

const router=express.Router()
router.post('/add',protect,addGoal)
router.get('/my-goals',protect,getGoals)

export default router