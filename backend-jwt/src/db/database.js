import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_NAME } from "../config/env.js";

export const conexionDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            database: DB_NAME
        });
        console.log(`Conectado a la base de datos: ${DB_NAME}`);
        return connection;
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${DB_NAME}`, error);
    }
};