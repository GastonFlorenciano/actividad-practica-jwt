import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import { SECRET_KEY } from './config.js';

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

// Middlewares 
app.use(cors({ // Permitir solicitudes desde el front-end
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Habilitar envío de cookies
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // true solo si usas HTTPS
        httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
        // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    }
}));

app.use(authRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
