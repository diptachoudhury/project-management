import { Request, Response } from 'express';
import { getUsersByDomain, getUserById } from '../services/user.service';

 interface JwtPayload {
  userId: string;
  domain: string;
}


export const getOrganizationUsers = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const users = await getUsersByDomain(req.user.domain);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to fetch users' });
  }
};

export const getUserInfo = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const user = await getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to fetch users' });
  }
};