import connection from "../database/db.js";

const selectAllProducts = async() => {
    let sql = "SELECT * FROM productos"

    return await connection.query(sql);
}

const SelectProductFromID = async(id) => {
    let sql = "SELECT * FROM productos WHERE id_product = ?"
    
    return await connection.query(sql, [id]);
}

const insertNewProduct = async(nombre, imagen, precio, categoria, activo) => {
    let sql = `INSERT INTO productos (nombre, imagen, precio, categoria, activo) VALUES (?, ?, ?, ?, ?)`

    return await connection.query(sql, [nombre, imagen, precio, categoria, activo])
}

const deleteProductFromID = async(id) => {
    let sql = "DELETE FROM productos WHERE id_product = ?";

    return await connection.query(sql, [id])
}

const updateProductFromID = async(nombre, imagen, precio, categoria ,activo, id_product) => {
    let sql = `UPDATE productos SET nombre = ?, imagen = ?, precio = ?, categoria = ?, activo = ? WHERE id_product = ?`

    return await connection.query(sql, [nombre,imagen,precio,categoria,activo,id_product]);
}

export default {
    selectAllProducts,
    SelectProductFromID,
    insertNewProduct,
    deleteProductFromID,
    updateProductFromID
}