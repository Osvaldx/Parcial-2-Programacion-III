import Admins from "../models/adminAccount.models.js";

export const createAdminAccount = async(req, res) => {
    try {
        let { correo,nombre,contraseña } = req.body;

        const [rows] = await Admins.createAdmin(correo,nombre,contraseña);
        res.status(200).json({
            message: (rows.affectedRows >= 1) ? "[+] CUENTA CREADA CON EXITO!" : "[!] NO SE PUDO CREAR LA CUENTA" 
        })

    } catch(error) {
        res.status(500).json({
            error: "[!] ERROR INTERNO DEL SERVIDOR"
        })
        console.log(`ERROR: ${error}`);
    }
};

export const deleteAdminAccount = async(req, res) => {
    try {
        let { id } = req.params;

        let [rows] = await Admins.deleteAdmin(id);
        
        res.status(200).json({
            message: (rows.affectedRows >= 1) ? `[+] LA CUENTA ID ${id} SE ELIMINO CON EXITO!` : `[!] NO SE PUDO ELIMINAR LA CUENTA CON ID: ${id}`
        })
    } catch(error) {
        res.status(500).json({
            error: "[!] ERROR INTERNO DEL SERVIDOR"
        })
        console.log(`ERROR: ${error}`);
    }
}

export const checkAdminAccount = async(req, res) => {
    try {
        let { nombre,contraseña } = req.body;

        let [rows] = await Admins.checkAdmin(nombre, contraseña);
    
        res.status(200).json({
            exitsAccount: (rows.length >= 1) ? true : false
        })
    } catch(error) {
        res.status(500).json({
            error: "[!] ERROR INTERNO DEL SERVIDOR"
        })
        console.log(`ERROR: ${error}`);
    }
}

export const getAllAdminAccounts = async(req, res) => {
    try {
        let [rows] = await Admins.getAdmins();

        res.status(200).json({
            accounts: rows
        })
    } catch(error) {
        res.status(500).json({
            error: "[!] ERROR INTERNO DEL SERVIDOR"
        })
        console.log(`ERROR: ${error}`);
    }
}