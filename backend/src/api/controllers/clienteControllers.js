import Cliente from "../models/cliente.models.js";

export const registerClient = async(req, res) => {
    try {
        const { nombre } = req.body;

        let [rows] = await Cliente.registerClientDB(nombre);
    
        res.status(200).json({
            message: (rows.affectedRows >= 1) ? "[+] Cliente registrado con exito" : "[!] Ocurrio un error al registrarse"
        })
    } catch(error) {
        res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}