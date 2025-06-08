import Task from "../models/task.model";
import User from "../models/user.model";

import { Document } from "mongoose";


export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  assignedBy: string; 
  domain: string; 
  createdAt: Date;
  updatedAt: Date;
}



export const createTask = async(
    title: string,
    description: string,
    assigneeId: string,
    assignedById: string,
    domain: string
) : Promise<ITask> => {
   
    const assignee  = await User.findOne({ _id: assignedById, domain})
    if(!assignee) {
        throw new Error('Assignee not found in your organization');
    }

  const task = new Task({
    title,
    description,
    assignee: assigneeId,
    assignedBy: assignedById,
    domain,
  });

  await task.save();
  return task;

}

export const getTasksByDomain = async (domain: string): Promise<ITask[]> => {
  return Task.find({ domain })
    .populate('assignee', 'name email')
    .populate('assignedBy', 'name email');
};



export const getUserTasks = async (userId: string, domain: string): Promise<ITask[]> => {
  return Task.find({ assignee: userId, domain })
    .populate('assignee', 'name email')
    .populate('assignedBy', 'name email');
};

export const updateTaskStatus = async (
  taskId: string,
  status: 'pending' | 'in-progress' | 'completed',
  userId: string
): Promise<ITask | null> => {
  const task = await Task.findOne({ _id: taskId, assignee: userId });
  if (!task) {
    throw new Error('Task not found or you are not the assignee');
  }

  task.status = status;
  await task.save();
  return task;
};