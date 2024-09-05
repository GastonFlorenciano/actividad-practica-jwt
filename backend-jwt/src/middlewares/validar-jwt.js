import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/env.js';
import { conexionDB } from '../db/database.js';

// Middleware para verificar el token JWT
export default async (req, res, next) => {

    const connection = await conexionDB();

    // console.log(req.session)
    // console.log('-----------')
    // console.log(req.cookies)
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

     const decoded = jwt.verify(token, SECRET_KEY);

    // Se busca al usuario en la base de datos
    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);

    console.log(user);


    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }


    req.user = user; // Agrega la información del usuario decodificada al request

    

    next();
};