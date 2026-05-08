import express from 'express';
import { suggestTasks, getTaskSuggestions } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/suggest', protect, suggestTasks);
router.post('/task-suggestions', protect, getTaskSuggestions);

export default router;
