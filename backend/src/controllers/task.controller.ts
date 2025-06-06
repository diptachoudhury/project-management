import { Request, Response} from 'express';
import { createTask, updateTaskStatus, assignTask, getTaskByProject } from '../services/task.service';
import { IGetUserAuthInfoRequest } from '../types/express';
export const createNewTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
 try{

        if (!req.user) {
      throw new Error('Not authenticated');
    }
    const task = await createTask({
        ...req.body,
        reporterId: req.user?._id.toString(),
        projectId: req.params.projectId,
    });

    res.status(201).json({success: true, data: task});
 }catch(error:any){
    res.status(400).json({ success: false, error: error.message});
 }
};


export const changeTaskStatus = async (req: Request, res:Response) => {
    try{
        const task = updateTaskStatus( req.params.taskId, req.body.status);
        res.status(200).json({succes: true, data: task});
    }catch(error:any){
        res.status(400).json({success: false, error: error.message});
    }
};

export const assignTaskToUser = async ( req:Request, res:Response) => {
    try{
        const task = await assignTask( req.params.taskId, req.body.assignedId);
        res.status(200).json({ success: true, data: task});
    }catch(error: any){
        res.status(400).json({success: false, error: error.message});
    }
}


export const getProjectTasks = async ( req: Request, res: Response) => {
    try{
       const task = await  getTaskByProject( req.params.projectId);
       res.status(200).json({success: true, data: task});
    }
    catch(error:any){
        res.status(400).json({ success: true, error: error.message});
    }
}





