import { Router } from 'express';
import authRoutes from './authRoutes';
import contentRoutes from './contentRoutes';
import prayerTimeRoutes from './prayerTimeRoutes';
import lectureRoutes from './lectureRoutes';
import courseRoutes from './courseRoutes';
import projectRoutes from './projectRoutes';
import activityRoutes from './activityRoutes';
import executiveRoutes from './executiveRoutes';
import faqRoutes from './faqRoutes';
import aboutRoutes from './aboutRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/prayer-times', prayerTimeRoutes);
router.use('/lectures', lectureRoutes);
router.use('/courses', courseRoutes);
router.use('/projects', projectRoutes);
router.use('/activities', activityRoutes);
router.use('/executives', executiveRoutes);
router.use('/faqs', faqRoutes);
router.use('/about', aboutRoutes);

export default router;
