import { Router } from 'express';
import { getAllCourses, getCourseById, createCourse, updateCourse, enrollInCourse } from '../controllers/courseController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorize('admin', 'staff'), createCourse);
router.put('/:id', protect, authorize('admin', 'staff'), updateCourse);
router.post('/:courseId/enroll', protect, enrollInCourse);

export default router;
