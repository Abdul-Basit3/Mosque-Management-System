import { Router } from 'express';
import {
  getTodayPrayerTimes,
  getPrayerTimesByDate,
  updatePrayerTimes,
  bulkCreatePrayerTimes,
  deletePrayerTimes
} from '../controllers/prayerTimes.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/today', getTodayPrayerTimes);
router.get('/:date', getPrayerTimesByDate);

// Protected routes (admin/staff only)
router.put('/', authenticate, authorize(['admin', 'staff']), updatePrayerTimes);
router.post('/bulk', authenticate, authorize(['admin', 'staff']), bulkCreatePrayerTimes);
router.delete('/:date', authenticate, authorize(['admin']), deletePrayerTimes);

export default router;
