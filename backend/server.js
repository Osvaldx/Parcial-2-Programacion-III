import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import validations from "./src/api/validations/serverValidations.js"
import morgan from "morgan";

const app = express();
const PORT = environments.port;

app.use(cors()); // MIDDLEWARE basico para permitir solicitudes
app.use(express.json()); // MIDDLEWARE PARA PODER RECIBIR COSAS DEL BODY EN EL POST
app.use(morgan("dev")) // MIDDLEWARE para registrar los metodos http

// ------------------------------------------------------------------------------------------ //
// GET PRODUCTS
try {
    app.get("/products", async(req, res) => {
        let sql = "SELECT * FROM productos"
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows,
            message: (rows.length === 0) ? "[-] No se encontraron productos" : "[+] Productos encontrados"
        })
    })
} 
catch(error) {
    res.status(500).json({error: "[!] Error interno del servidor al obtener productos"})
    console.log("Error: " + error)
}
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// GET PRODUCT ID
try {
    
    app.get("/products/:id", async(req,res) => {
        let sql = "SELECT * FROM productos WHERE id_product = ?" //-> se usa ? pq al poner el parametro "id" es vulnerable a sqlinjections
        let { id } = req.params  //-> desestructuracion a un objeto
        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            payload: rows,
            message: (rows.length === 0) ? "[-] No se encontro producto con ese ID" : "[+] Producto encontrado"
        })
    })

} catch (error) {
    res.status(500).json({error: "[!] Error interno del servidor al obtener productos"})
    console.log("Error: " + error)
}
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// INSERT PRODUCT
try {
    app.post("/addproduct", async(req, res) => {
        let { nombre, imagen, precio, categoria, activo } = req.body
        let sql = `INSERT INTO productos (nombre, imagen, precio, categoria, activo) VALUES (?, ?, ?, ?, ?)`

        let results = validations.parametersValidation(nombre, imagen, precio, categoria);
        if(!results.allow) {
            return res.status(404).json({
                error: results.message
            })
        }

        const [rows] = await connection.query(sql, [nombre, imagen, precio, categoria, activo])
        
        return res.status(200).json({
            message: (rows.length === 0) ? "[-] NO SE AGREGO EL PRODUCTO" : "[+] PRODUCTO AGREGADO"
        })
    })
} catch (error) {
    res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
    console.log("Error: " + error)
}
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
// DELETE PRODUCT
try {
    app.delete("/deleteproduct/:id", async(req, res) => {
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
    })

} catch (error) {
    res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
    console.log("Error: " + error)
}
// ------------------------------------------------------------------------------------------ //
try {
    app.put("/modifiedProduct/:id/:param/:value", async(req, res) => {
        let { id, param, value } = req.params;

        if(!validations.isParameter(param)){
            return res.status(404).json({
                error: "[!] Parametro a modificar no valido"
            });
        }

        if(!value) {
            return res.status(404).json({
                error: "[!] El valor del parametro no puede ser null o vacio"
            });
        }

        let sql = `UPDATE productos SET ${param} = ? WHERE id_product = ?`
        let [rows] = await connection.query(sql, [value,id])

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "[!] No se pudo modificar el producto"
            });
        } else {
            return res.status(200).json({
                message: "[+] Producto modificado"
            });
        }
    })

} catch (error) {
    res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
    console.log("Error: " + error)
}
// ------------------------------------------------------------------------------------------ //

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
});