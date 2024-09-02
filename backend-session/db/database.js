import mysql from 'mysql2/promise' // Importa el módulo mysql2/promise para utilizar promesas con MySQL

// Función asincrónica para establecer la conexión a la base de datos
export const conexionDB = async () => {
    try {
        // Crea una conexión a la base de datos con los parámetros especificados
        const connection = await mysql.createConnection ({
            host: 'localhost', // Host donde se encuentra la base de datos
            port: 3306,         // Puerto en el que escucha MySQL
            database: 'db_system', // Nombre de la base de datos
            user: 'root',          // Usuario de la base de datos
            password: ''            // Contraseña del usuario de la base de datos
        })
        console.log('Conexión a la base de datos exitosa');
        return connection; // Devuelve la conexión para ser utilizada en otras partes del código
    } catch (err) {
        console.log('Error al conectar', err);
        throw err; // Lanza el error para que pueda ser manejado por la función que llame a conexionDB
    }   
}
