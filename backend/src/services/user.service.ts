import User from "../models/user.model";
import { IUser } from "../models/user.model";

export const getUsersByDomain = async (domain: string): Promise<IUser[]> => {
  return User.find({ domain }).select('-password');
};