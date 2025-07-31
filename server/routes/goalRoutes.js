import express from 'express';
import { addGoal, getGoalsByGroup } from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addGoal);
router.get('/group/:groupId', protect, getGoalsByGroup);

export default router;
