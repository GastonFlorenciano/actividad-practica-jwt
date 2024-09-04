import { conexionDB } from '../db/database.js';

const ctrl = {};

ctrl.getUsers = async (req, res) => {

    const connection = await conexionDB();

    const [users] = await connection.execute('SELECT * FROM users');
    res.json(users);

}

ctrl.login = async (req, res) => {

    const connection = await conexionDB();

    const { username, password } = req.body;

    // Buscar usuario
    // const user = database.user.find(u => u.username === username && u.password === password);
    const [user] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    console.log(user);

    if (user.length > 0) {

        req.session.userId = user[0].id;
        req.session.username = user[0].username;

        return res.json({
            message: 'Inicio de sesión exitoso',
            user: { id: user[0].id, username: user[0].username }
        });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};

ctrl.register = async (req, res) => {

    const connection = await conexionDB();

    const { username, password } = req.body;

    await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    const [user] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    console.log(user);

    if (user.length === 0) {
        
        return res.status(401).json({ message: 'Datos faltantes' });

    } else {

        req.session.userId = user[0].id;
        req.session.username = user[0].username;

        return res.json({
            message: 'Usuario registrado exitosamente',
            user: { id: user[0].id, username: user[0].username }
        });

    }
};

ctrl.session = async (req, res) => {
    if (req.session.userId) {
        return res.json({
            loggedIn: true,
            user: { id: req.session.userId, username: req.session.username }
        });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
};

ctrl.logout = async (req, res) => {
        console.log(req.session)
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar la sesión' });
            }
            res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
            return res.json({ message: 'Sesión cerrada exitosamente' });
        });
    };

export default ctrl;