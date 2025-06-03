import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    comparePassword(candidatePassword: string) : Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});

//pre save hook middleware
UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

//compare

UserSchema.methods.comparePassword = async function(candidatePassword: string) : Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model<IUser>("User", UserSchema);