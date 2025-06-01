import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  project: mongoose.Types.ObjectId;
  reporter: mongoose.Types.ObjectId;
  assignee?: mongoose.Types.ObjectId;
  dueDate?: Date;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: Date }
}, { timestamps: true });

export const Task = mongoose.model<ITask>("Task", TaskSchema);