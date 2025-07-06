import connection from "../database/db.js";

const createAdmin = async (correo,nombre,contraseña) => {
    let sql = "INSERT INTO usuarios_admin (correo, nombre, contraseña) VALUES (?, ?, ?);"

    return await connection.query(sql, [correo,nombre,contraseña]);
}

const deleteAdmin = async (id) => {
    let sql = "DELETE FROM usuarios_admin WHERE id_admin = ?"

    return await connection.query(sql, [id]);
}

export default {
    createAdmin,
    deleteAdmin,
}