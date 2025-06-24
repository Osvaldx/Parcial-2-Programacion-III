import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

// CORS basico para permitir solicitudes
app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})