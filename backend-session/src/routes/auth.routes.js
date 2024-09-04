import { Router } from 'express';
import { validationsForm } from '../validations.js';
import { applyValidations } from '../applyValidations.js';
import ctrl from '../controllers/auth.controllers.js';

const router = Router()

router.post('/login', validationsForm, applyValidations, ctrl.login);
router.get('/session', ctrl.session);
router.post('/logout', ctrl.logout);
router.post('/register', validationsForm, applyValidations, ctrl.register);
router.get('/', ctrl.getUsers);

export default router;