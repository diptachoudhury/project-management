import mongoose, { Schema, Document, Types, Model  } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
     _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    domain: string;
    comparePassword(candidatePassword: string) : Promise<boolean>; 
}


const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, select: false },
    domain: { type: String, required: true }
}, { timestamps: true });

userSchema.pre<IUser>('save', async function(next) {
    if(!this.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
         next(error as Error);
    }

})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;