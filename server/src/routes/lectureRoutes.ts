import { Router } from 'express';
import { getAllLectures, getLectureById, createLecture, updateLecture, deleteLecture } from '../controllers/lectureController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllLectures);
router.get('/:id', getLectureById);
router.post('/', protect, authorize('admin', 'staff'), createLecture);
router.put('/:id', protect, authorize('admin', 'staff'), updateLecture);
router.delete('/:id', protect, authorize('admin'), deleteLecture);

export default router;
