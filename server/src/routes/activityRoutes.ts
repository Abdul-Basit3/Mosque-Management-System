import { Router } from 'express';
import { getAllActivities, getActivityById, createActivity, registerForActivity, updateRegistrationStatus } from '../controllers/activityController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post('/', protect, authorize('admin', 'staff'), createActivity);
router.post('/:activityId/register', protect, registerForActivity);
router.put('/registrations/:id/status', protect, authorize('admin', 'staff'), updateRegistrationStatus);

export default router;
