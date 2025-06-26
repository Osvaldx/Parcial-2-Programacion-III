import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import validations from "./src/api/validations/serverValidations.js"
import morgan from "morgan";
import parametersValidation from "./src/api/validations/serverValidations.js";

const app = express();
const PORT = environments.port;

//MIDDLEWARES

app.use(cors()); // MIDDLEWARE basico para permitir solicitudes
app.use(express.json()); // MIDDLEWARE PARA PODER RECIBIR COSAS DEL BODY EN EL POST
app.use(morgan("dev")) // MIDDLEWARE para registrar los metodos http

const validateID = (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            message: "[!] ERROR el ID no puede ser vacio."
        })
    }
    
    req.id = parseInt(id, 10);
    next();
}


// ------------------------------------------------------------------------------------------ //
// GET PRODUCTS
app.get("/products", async(req, res) => {
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

app.get("/products/:id",validateID, async(req,res) => {
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
app.post("/addproduct", async(req, res) => {
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
app.delete("/deleteproduct/:id",validateID, async(req, res) => {
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
// UPDATE PRODUCT
app.post("/updateProduct", async(req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
});