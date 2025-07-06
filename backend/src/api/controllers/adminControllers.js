import Admins from "../models/adminAccount.models.js";
import adminValidations from "../validations/adminParameterValidations.js";

export const createAdminAccount = async(req, res) => {
    try {
        let { correo,nombre,contraseña } = req.body;

        let result = adminValidations.parametersValidation(correo,nombre,contraseña);
        if(!result.allow) {
            return res.status(400).json({
                error: result.message
            })
        }

        const [rows] = await Admins.createAdmin(correo,nombre,contraseña);
        res.status(200).json({
            message: (rows.length == 0) ? "[!] NO SE PUDO CREAR LA CUENTA" : "[+] CUENTA CREADA CON EXITO!"
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
        if(!adminValidations.ValidateID(id)) {
            return res.status(400).json({
                message: "[!] ID no valida"
            })
        }
        
        let [rows] = await Admins.deleteAdmin(id);
        
        res.status(200).json({
            message: (rows.length == 0) ? `[!] NO SE PUDO ELIMINAR LA CUENTA CON ID: ${id}` : `[+] LA CUENTA ID ${id} SE ELIMINO CON EXITO!`
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
        let { username, password } = req.body;
        let result = adminValidations.parametersValidation(null, username, password);
    
        if(!result.allow) {
            return res.status(400).json({
                message: result.message
            })
        }
    
        let [rows] = await Admins.checkAdmin(username, password);
    
        res.status(200).json({
            exitsAccount: (rows.length == 0) ? false : true
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