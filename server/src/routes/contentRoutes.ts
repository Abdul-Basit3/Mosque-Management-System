import { Router } from 'express';
import { getActiveContent, getRandomContent, createContent, updateContent, deleteContent } from '../controllers/contentController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getActiveContent);
router.get('/random', getRandomContent);
router.post('/', protect, authorize('admin', 'staff'), createContent);
router.put('/:id', protect, authorize('admin', 'staff'), updateContent);
router.delete('/:id', protect, authorize('admin'), deleteContent);

export default router;
