import { Router } from 'express';
import { register, login, getOrgUsers } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getOrgUsers);

export default router;