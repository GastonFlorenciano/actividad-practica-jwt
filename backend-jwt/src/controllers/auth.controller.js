import { conexionDB } from "../db/database.js";
import generarJwt from "./../helpers/generar-jwt.js";

const ctrl = {};

ctrl.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await conexionDB();

    const [user] = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    // Generar token JWT
    const token = await generarJwt(user[0].id);

    // Almacenar el token en la sesión del servidor
    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Datos erroneos" });
  }
};

ctrl.register = async (req, res) => {

  const { username, password } = req.body;

  try {
    const connection = await conexionDB();

    await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    const [user] = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    console.log(user);

    // Generar token JWT
    const token = await generarJwt(user.id);

    // Almacenar el token en la sesión del servidor
    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });

    return res.json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

ctrl.session = (req, res) => {

  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};

ctrl.logout = async(req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }

            res.clearCookie('authToken');
            return res.json({ message: 'Cierre de sesión exitoso' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};

export { ctrl };
