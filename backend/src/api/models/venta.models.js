import connection from "../database/db.js";

const registerSaleDB = async (id_cliente,fecha_venta,total) => {
    let sql = "INSERT INTO ventas (id_cliente, fecha_venta, total) VALUES (?, ?, ?);";

    return await connection.query(sql, [id_cliente,fecha_venta,total]);
}

const registerSaleOfProductsDB = async(id_venta,id_product,cantidad,subtotal) => {
    let sql = "INSERT INTO venta_productos (id_venta, id_product, cantidad, subtotal) VALUES (?, ?, ?, ?);";

    return await connection.query(sql, [id_venta,id_product,cantidad,subtotal]);
}

export default {
    registerSaleDB,
    registerSaleOfProductsDB
}