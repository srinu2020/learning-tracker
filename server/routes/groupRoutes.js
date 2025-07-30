
import express from 'express'
import { joinGroup,viewGroups } from '../controllers/groupController.js'
import { protect } from '../middleware/authMiddleware.js'
const router=express.Router()
router.post('/join',protect,joinGroup)
router.get('/view',protect,viewGroups)
export default router