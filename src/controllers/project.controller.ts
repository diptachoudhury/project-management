// src/controllers/project.controller.ts
import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { IGetUserAuthInfoRequest } from '../types/express';
export const createNewTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Not authenticated');
    }

    const project = await Project.create({
      name: req.body.name,
      owner: req.user._id
    });

    res.status(201).json({ success: true, data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};