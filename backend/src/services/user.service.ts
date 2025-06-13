import User from "../models/user.model";
import { IUser } from "../models/user.model";

export const getUsersByDomain = async (domain: string): Promise<IUser[]> => {
  return User.find({ domain }).select('-password');
};

export const getUserById = async (id: string ): Promise<IUser> => {
  return User.findById({'_id':id}).select('-password');
};