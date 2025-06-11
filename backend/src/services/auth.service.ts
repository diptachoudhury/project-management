import User from '../models/user.model';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import jwt from 'jsonwebtoken';
import { Document, Types  } from 'mongoose'




interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    domain: string;
    comparePassword(candidatePassword: string) : Promise<boolean>; 
}

 interface JwtPayload {
  userId: string;
  domain: string;
}

interface LoginResponse {
  user1: any; 
  token: string;
}

//register user fn
export const registerUser = async (name: string, email: string, password: string, domain: string): Promise<IUser> => {
  const existingUser = await User.findOne({ email }).select("+password");
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = new User({ name, email, password, domain });
  await user.save();
  return user;
};


//login--fn
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
   
  let user1;
  const user = await User.findOne({ email }).select("+password"); // select or compare won't work
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  } 
    
  
  user1 = await User.findOne({email}).select("-password");
  



  const payload: JwtPayload = {
    userId: user._id.toString(),
    domain: user.domain,
  };

  const token =  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }) 
  return {user1, token};
};

//get org user fn
export const getDomainUsers = async (domain: string): Promise<IUser[]> => {
  return User.find({ domain }).select('-password');
};