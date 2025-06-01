import mongoose, { Document } from "mongoose";

interface IProject extends Document {
    name: string,
    key: string,
    owner: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
}

const ProjectSchema = new mongoose.Schema<IProject> ({
    name: { type: String, required: true},
    key: {  type: String, unique: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    members: [{ types: mongoose.Schema.Types.ObjectId, ref: "User"}],
})

export const Project = mongoose.model<IProject>("Project", ProjectSchema);