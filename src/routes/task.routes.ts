import express from 'express';
import { 
    createNewTask,
    changeTaskStatus,
    assignTaskToUser,
    getProjectTasks
 } from '../controllers/task.controller';
 import { protect } from '../middleware/auth';

 const router = express.Router();

 router.use(protect as express.RequestHandler);

 router.post("/projects/:projectId/tasks", createNewTask);
 router.patch("/tasks/taskId/status", changeTaskStatus);
 router.patch("/tasks/:taskId/assign", assignTaskToUser);
 router.get("/projects/:projectId/tasks",getProjectTasks);

 export default router;