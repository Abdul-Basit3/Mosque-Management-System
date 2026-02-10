import { Router } from 'express';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faqController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllFAQs);
router.post('/', protect, authorize('admin', 'staff'), createFAQ);
router.put('/:id', protect, authorize('admin', 'staff'), updateFAQ);
router.delete('/:id', protect, authorize('admin'), deleteFAQ);

export default router;
