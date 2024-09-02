// server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/env.js';
import morgan from 'morgan';
import { router } from './routes/auth.routes.js';
import { validateSession } from './session.validate.js';


const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(validateSession);

app.use(router)

// Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
