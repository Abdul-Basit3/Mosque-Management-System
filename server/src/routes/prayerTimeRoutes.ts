import { Router } from 'express';
import { getTodayPrayerTimes, getPrayerTimesByDateRange, createPrayerTime, updatePrayerTime } from '../controllers/prayerTimeController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/today', getTodayPrayerTimes);
router.get('/range', getPrayerTimesByDateRange);
router.post('/', protect, authorize('admin', 'staff'), createPrayerTime);
router.put('/:id', protect, authorize('admin', 'staff'), updatePrayerTime);

export default router;
