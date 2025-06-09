import { Request, Response } from 'express';
import { registerUser, loginUser, getDomainUsers } from '../services/auth.service';


 interface JwtPayload {
  userId: string;
  domain: string;
}



export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, domain } = req.body;
    const user = await registerUser(name, email, password, domain);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' });
  }
};

export const getOrgUsers = async (req: Request & { user?: JwtPayload }, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const users = await getDomainUsers(req.user.domain);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to fetch users' });
  }
};