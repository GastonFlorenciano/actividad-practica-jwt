import { Router } from 'express'
import { ctrl } from '../controllers/auth.controller.js';
import { validationsForm } from '../validations.js';
import { applyValidations } from '../applyValidations.js';
import validarJwt  from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/login', validationsForm, applyValidations, ctrl.login);
router.post('/register', validationsForm, applyValidations, ctrl.register);
router.get('/session', validarJwt, ctrl.session);
router.post('/logout', ctrl.logout);

export { router }