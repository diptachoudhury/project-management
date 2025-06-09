import { Router } from 'express';
import { getOrganizationUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getOrganizationUsers);
export default router;