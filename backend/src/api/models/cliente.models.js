import connection from "../database/db.js";

const registerClientDB = async(nombre) => {
    let sql = "INSERT INTO clientes (nombre) VALUES (?);";

    return await connection.query(sql, [nombre]);
}

export default {
    registerClientDB
}