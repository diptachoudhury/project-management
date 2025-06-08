import { Project } from "../models/Project";
import { Task } from "../models/Task";
import { ITask } from "../models/Task";


export const createTask = async ( taskData: {
    title: string;
    projectId: string;
    reporterId: string;
    description?: string;
    priority?: "low" | "medium" | "high";
}) => {
    return await Task.create({
        title: taskData.title,
        description: taskData.description,
        project: taskData.projectId,
        reporter: taskData.reporterId,
        priority: taskData.priority || "medium"
    });
};

export const  updateTaskStatus  = async(
    taskId: string,
    status:"todo" | "in-progress" | "done"
) => {
   return await Task.findByIdAndUpdate(
    taskId,
    { status },
    { new: true}
   ).populate('assignee', 'name email') 
};


export const assignTask = async ( taskId: string, assignedId: string ) =>{

    return await Task.findByIdAndUpdate(
        taskId,
        { assignee: assignedId },
        { new: true}
    ).populate('assignee', 'name email')
};


export const getTaskByProject = async( projectId: string) =>{
    return await Task.find({project: projectId})
        .populate("reporter", "name email")
        .populate("assignee", "name email")
};

