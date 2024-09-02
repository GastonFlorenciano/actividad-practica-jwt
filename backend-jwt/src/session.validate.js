import session from 'express-session';
import { SECRET_KEY }  from './config/env.js';

export const validateSession = session({
    secret: SECRET_KEY, // Cambia esto por una clave secreta en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usar 'true' si usas HTTPS
});