import Venta from "../models/venta.models.js";

export const registerSale = async(req, res) => {
    try {
        const { id_cliente, fecha_venta, total } = req.body;

        const [rows] = await Venta.registerSaleDB(id_cliente, fecha_venta, total);

        res.status(200).json({
            message: (rows.affectedRows >= 1) ? "[+] Venta registrada con exito!" : "[!] No se pudo registrar la venta"
        })

    } catch(error) {
        res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}

export const registerSaleOfProducts = async(req, res) => {
    try {
        const { id_venta,id_product,cantidad,subtotal } = req.body;

        const [rows] = await Venta.registerSaleOfProductsDB(id_venta, id_product, cantidad, subtotal);
        res.status(200).json({
            message: (rows.affectedRows >= 1) ? "[+] Producto vendido registrado con exito!" : "[!] No se pudo registrar el producto"
        })

    } catch(error) {
        res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}