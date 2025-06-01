
import { IUser } from "../models/User";
import { User } from "../models/User";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signToken = (id:any) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}


export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
}) : Promise<{ user: IUser; token:string }> =>{

    const { name, email, password } = userData;
    const user = await User.create({ name, email, password});
    const token = signToken(user._id);
    return { user, token};
}

export const loginUser = async (email: string, password: string ) => {
    const  user = await User.findOne({email}).select("+password");
    if(!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid email or password");
    }

    const token =signToken(user._id);
    return { user, token };


} 