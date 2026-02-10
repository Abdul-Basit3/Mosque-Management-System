import { Router } from 'express';
import { getAllExecutives, getExecutiveById, createExecutive, updateExecutive, deleteExecutive } from '../controllers/executiveController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllExecutives);
router.get('/:id', getExecutiveById);
router.post('/', protect, authorize('admin'), createExecutive);
router.put('/:id', protect, authorize('admin'), updateExecutive);
router.delete('/:id', protect, authorize('admin'), deleteExecutive);

export default router;
