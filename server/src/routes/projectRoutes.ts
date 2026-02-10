import { Router } from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, donateToProject } from '../controllers/projectController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', protect, authorize('admin', 'staff'), createProject);
router.put('/:id', protect, authorize('admin', 'staff'), updateProject);
router.post('/:projectId/donate', donateToProject);

export default router;
