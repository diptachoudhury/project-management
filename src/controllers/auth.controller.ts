import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register  = async( req:Request, res: Response) => {
  try{
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ success: true, data: { user, token }})
  } catch(error:any){
    res.status(400).json({ success: false, error: error.message});
  } 
};


export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ success:true, data: { user, password }});
    } catch(error: any){
        res.status(401).json({ success: false, error: error.message});
    }
}