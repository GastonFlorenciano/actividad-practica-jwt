import { Router } from 'express'
import { ctrl } from '../controllers/auth.controller.js';
import validarJwt  from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.get('/session', validarJwt, ctrl.session);
router.post('/logout', ctrl.logout);

export { router }