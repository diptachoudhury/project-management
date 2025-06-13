import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model'; // Make sure this path is correct
import { JWT_SECRET } from '../config/jwt';


 interface JwtPayload {
  userId: string;
  domain: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; 
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: 'No token, authorization denied' });
    return;
    }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;

    const userFromDb = await User.findById(req.user.userId);

    if (!userFromDb) {
       res.status(404).json({ message: 'User not found in database' });
        return;
      }

    // 2. Compare the domain from the JWT with the domain stored in the database
    if (userFromDb.domain !== req.user.domain) {
       res.status(403).json({ message: 'You are not allowed in this organization.' });
      return;
      }
    
    next(); 

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
       res.status(401).json({ message: 'Token expired' });
       return;
    }
    res.status(401).json({ message: 'Token is not valid' });
    return
  }
};