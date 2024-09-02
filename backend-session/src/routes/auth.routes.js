import { Router } from 'express';
import ctrl from '../controllers/auth.controllers.js';

const router = Router()

router.post('/login', ctrl.login);
router.get('/session', ctrl.session);
router.post('/logout', ctrl.logout);
router.get('/', ctrl.getUsers);

export default router;