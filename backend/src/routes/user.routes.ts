import { Router } from 'express';
import { getOrganizationUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getUserInfo } from '../controllers/user.controller';

const router = Router();

router.get('/', authMiddleware, getOrganizationUsers);
router.get('/user-info', authMiddleware, getUserInfo );
export default router;