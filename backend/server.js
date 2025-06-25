import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

// CORS basico para permitir solicitudes
app.use(cors());
app.use(express.json()); // MIDDLEWARE PARA PODER RECIBIR COSAS DEL BODY EN EL POST


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

// GET PRODUCTS ID

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

// INSERT PRODUCTS
try {
    app.post("/addproduct", async(req, res) => {
        let { nombre, imagen, precio, categoria, activo } = req.body
        
        let sql = `INSERT INTO productos (nombre, imagen, precio, categoria, activo) VALUES 
                (?, ?, ?, ?, ?)
        `
        const [rows] = await connection.query(sql, [nombre, imagen, precio, categoria, activo])
        
        res.status(200).json({
            message: (rows.length === 0) ? "[-] NO SE AGREGO EL PRODUCTO" : "[+] PRODUCTO AGREGADO"
        })
        
    })
} catch (error) {
    res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
    console.log("Error: " + error)
}



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})