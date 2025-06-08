import { Router } from 'express';
import { 
  createNewTask, 
  getOrgTasks, 
  getUserAssignedTasks, 
  updateTask 
} from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createNewTask);
router.get('/', authMiddleware, getOrgTasks);
router.get('/my-tasks', authMiddleware, getUserAssignedTasks);
router.patch('/:taskId', authMiddleware, updateTask);

export default router;