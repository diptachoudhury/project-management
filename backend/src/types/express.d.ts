import { Request } from "express"
import { IUser } from "../models/User";
export interface IGetUserAuthInfoRequest extends Request {
   user?: IUser; 
}