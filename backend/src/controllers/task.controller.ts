import { Request, Response } from 'express';
import { createTask, getTasksByDomain, getUserTasks, updateTaskStatus } from '../services/task.service';

 interface JwtPayload {
  userId: string;
  domain: string;
}

export const createNewTask = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const { title, description, assignee } = req.body;
    const task = await createTask(
      title,
      description,
      assignee,
      req.user.userId,
      req.user.domain
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Task creation failed' });
  }
};

export const getOrgTasks = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const tasks = await getTasksByDomain(req.user.domain);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to fetch tasks' });
  }
};

export const getUserAssignedTasks = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const tasks = await getUserTasks(req.user.userId, req.user.domain);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await updateTaskStatus(taskId, status, req.user.userId);
    if (!updatedTask) {
      throw new Error('Task not found');
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update task' });
  }
};