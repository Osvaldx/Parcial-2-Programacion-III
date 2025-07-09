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

const validateName = (req, res, next) => {
    const { nombre } = req.body;
    const regexName = new RegExp("^[a-zA-Z\\s]+$")

    if((!regexName.test(nombre)) || !nombre) {
        return res.status(404).json({
            message: "[!] Nombre no valido"
        })
    }

    next();
}

const validateSale = (req, res, next) => {
    const { id_cliente, fecha_venta, total } = req.body;

    if(!id_cliente || isNaN(id_cliente)) {
        return res.status(404).json({
            message: "[!] ID_CLIENTE INVALIDA"
        })
    }

    if(!fecha_venta) {
        return res.status(404).json({
            message: "[!] FECHA INVALIDA"
        })
    }

    if(!total || isNaN(total)) {
        return res.status(404).json({
            message: "[!] TOTAL INVALIDA"
        })
    }

    next();
}

const validateSaleOfProducts = (req, res, next) => {
    const { id_venta,id_product,cantidad,subtotal } = req.body;

    if(!id_venta || isNaN(id_venta)) {
        return res.status(404).json({
            message: "[!] ID DE VENTA INVALIDA"
        })
    }

    if(!id_product || isNaN(id_product)) {
        return res.status(404).json({
            message: "[!] ID DEL PRODUCTO INVALIDA"
        })
    }

    if(!cantidad || isNaN(cantidad)) {
        return res.status(404).json({
            message: "[!] CANTIDAD INVALIDA"
        })
    }

    if(!subtotal || isNaN(subtotal)) {
        return res.status(404).json({
            message: "[!] SUBTOTAL INVALIDO"
        })
    }

    next();
}

export default {
    validateID,
    validateName,
    validateSale,
    validateSaleOfProducts
}