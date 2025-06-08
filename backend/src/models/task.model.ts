import mongoose, { Schema, Document } from 'mongoose';

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

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  domain: { type: String, required: true },
}, { timestamps: true });

const Task =  mongoose.model<ITask>('Task', taskSchema);

export default Task;