import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { IUser } from "../models/User";
import { IGetUserAuthInfoRequest } from "../types/express";

export const protect = async ( 
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
) => {
    let token;
    if(req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token){
        return res.status(401).json({
            success: false,
            error: "Not authorized to acces the route"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
         const user: IUser | null = await User.findById(decoded.id);
          if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        
        next();

    }catch(error){

         return res.status(401).json({
      success: false,
      error: "Not authorized to access this route"
    });

    }


}