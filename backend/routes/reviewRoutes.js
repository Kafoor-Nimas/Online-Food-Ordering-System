import express from 'express';
import { addReview, getProductReviews } from '../controllers/reviewController.js';
import { auth } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.get('/:productId', getProductReviews);
router.post('/', auth, addReview); 

export default router;