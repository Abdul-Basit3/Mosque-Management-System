import { Router } from 'express';
import { getAboutInfo, updateAboutInfo } from '../controllers/aboutController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAboutInfo);
router.put('/', protect, authorize('admin'), updateAboutInfo);

export default router;
