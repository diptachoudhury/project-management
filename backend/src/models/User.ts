import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: "user" | "admin",
    projects: mongoose.Types.ObjectId[]
}


const UserSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user"},
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project"}], 
})

export const User = mongoose.model<IUser>("User", UserSchema);