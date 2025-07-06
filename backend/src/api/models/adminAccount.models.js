import connection from "../database/db.js";

const createAdmin = async (correo,nombre,contraseña) => {
    let sql = "INSERT INTO usuarios_admin (correo, nombre, contraseña) VALUES (?, ?, ?);"

    return await connection.query(sql, [correo,nombre,contraseña]);
}

const deleteAdmin = async (id) => {
    let sql = "DELETE FROM usuarios_admin WHERE id_admin = ?"

    return await connection.query(sql, [id]);
}

const checkAdmin = async(username, password) => {
    let sql = "SELECT * FROM usuarios_admin WHERE (nombre = ?) AND (contraseña = ?)"

    return await connection.query(sql, [username, password]);
}

export default {
    createAdmin,
    deleteAdmin,
    checkAdmin
}