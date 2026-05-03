import express from 'express';
import { authUser, registerUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  authUser
);

router.route('/profile').get(protect, getUserProfile);

export default router;
