import Cliente from "../models/cliente.models.js";

export const registerClient = async(req, res) => {
    try {
        const { nombre } = req.body;

        let [rows] = await Cliente.registerClientDB(nombre);

        if(rows.affectedRows > 0) {
            res.status(200).json({
                message: "[+] Cliente registrado con exito",
                id_cliente: rows.insertId
            })
        } else {
            res.status(400).json({
                message: "[!] Ocurrio un error al registrarse"
            })
        }
    
    } catch(error) {
        res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}