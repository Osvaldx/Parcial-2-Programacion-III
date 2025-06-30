import { Router } from "express"; // middleware express.router;
import connection from "../database/db.js";
import middlewares from "../middlewares/middlewares.js";

const router = Router();

// ------------------------------------------------------------------------------------------ //
// GET PRODUCTS
router.get("/products", async(req, res) => {
    try {
        let sql = "SELECT * FROM productos"
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows,
            message: (rows.length === 0) ? "[-] No se encontraron productos" : "[+] Productos encontrados"
        })
    }
    catch(error) {
        res.status(500).json({error: "[!] Error interno del servidor al obtener productos"})
        console.log("Error: " + error)
    }
});
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// GET PRODUCT ID
router.get("/products/:id",middlewares.validateID, async(req,res) => {
    try {
        let sql = "SELECT * FROM productos WHERE id_product = ?" //-> se usa ? pq al poner el parametro "id" es vulnerable a sqlinjections
        let { id } = req.params  //-> desestructuracion a un objeto
        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            payload: rows,
            message: (rows.length === 0) ? "[-] No se encontro producto con ese ID" : "[+] Producto encontrado"
        })
    } catch (error) {
        res.status(500).json({error: "[!] Error interno del servidor al obtener productos"})
        console.log("Error: " + error)
    }
});
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// INSERT PRODUCT
router.post("/products/add", async(req, res) => {
    try {
        let { nombre, imagen, precio, categoria, activo } = req.body
        let sql = `INSERT INTO productos (nombre, imagen, precio, categoria, activo) VALUES (?, ?, ?, ?, ?)`

        let results = parametersValidation(nombre, imagen, precio, categoria, activo);
        if(!results.allow) {
            return res.status(404).json({
                error: results.message
            })
        }

        const [rows] = await connection.query(sql, [nombre, imagen, precio, categoria, activo])
        
        return res.status(200).json({
            message: (rows.length === 0) ? "[-] NO SE AGREGO EL PRODUCTO" : "[+] PRODUCTO AGREGADO"
        })
    } catch (error) {
        res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
        console.log("Error: " + error)
    }
});
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// DELETE PRODUCT
router.delete("/products/delete/:id",middlewares.validateID, async(req, res) => {
    try {
        let { id } = req.params;
        let sql = "DELETE FROM productos WHERE id_product = ?";
        let [rows] = await connection.query(sql, [id]);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "[!] No existe producto con esa ID"
            });
        } else {
            return res.status(200).json({
                message: "[+] Producto eliminado"
            });
        }
    } catch (error) {
        res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
        console.log("Error: " + error)
    }
});
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// UPDATE PRODUCT
router.post("/products/update", async(req, res) => {
    try {
        let { id_product, nombre, imagen, precio, categoria, activo } = req.body;

        let results = parametersValidation(nombre,imagen,precio,categoria,activo);
        if(!results.allow) {
            return res.status(400).json({
                error_message: results.message
            })
        }

        let sql = `UPDATE productos SET nombre = ?, imagen = ?, precio = ?, categoria = ?, activo = ? WHERE id_product = ?`
        let [rows] = await connection.query(sql, [nombre,imagen,precio,categoria,activo,id_product]);

        return res.status(200).json({
            message: (rows.affectedRows === 0) ? "[!] No se encontro un producto con ese ID" : "[+] Producto actualizado con exito!"
        })

    } catch (error) {
        res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
        console.log("Error: " + error)
    }
});
// ------------------------------------------------------------------------------------------ //

export default router;