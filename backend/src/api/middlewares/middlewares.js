const validateID = (req, res, next) => {
    const regEx = new RegExp("^[0-9]+$")
    const { id } = req.params

    if (!regEx.test(id) || !id) {
        return res.status(400).json({
            message: "[!] ERROR el ID no es valido."
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

const parametersAdminValidation = (req, res, next) => {
    const regExCorreo = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"); // regex para validar el correo
    const regExNombre = new RegExp("^[a-zA-Z0-9]+$");

    let { correo, nombre, contraseña } = req.body;

    if(correo != null) {
        if(!regExCorreo.test(correo) || !correo) {
            return res.status(404).json({
                message: "[!] Correo no valido o vacio"
            })
        }
    }
    
    if(!regExNombre.test(nombre) || !nombre) {
        return res.status(404).json({
            message: "[!] Nombre no valido o vacio"
        })
    }

    if(!contraseña) {
        return res.status(404).json({
            message: "[!] La contraseña no puede estar vacia"
        })
    }

    next();
}

const parametersProductsValidation = (req, res, next) => {
    const regEx = new RegExp("^https://[a-zA-Z0-9].{3,}")
    let { nombre,imagen,precio,categoria, activo } = req.body;

    if(!nombre || !imagen || !precio || !categoria){
        return res.status(404).json({
            message: "[!] Debe completarse todos los campos"
        })
    }

    if(!regEx.test(imagen)) {
        return res.status(404).json({
            message: "[!] La imagen no respeta el formato o esta vacio"
        })
    }

    if(precio < 0) {
        return res.status(404).json({
            message: "[!] El precio no puede ser negativo"
        })
    }

    if(categoria != "SKATE" && categoria != "ROLLER") {
        return res.status(404).json({
            message: "[!] La categoria no es correcta"
        })
    }

    if(activo != true && activo != false) {
        return res.status(404).json({
            message: "[!] El activo no es un booleano"
        })
    }

    next();
}

export default {
    validateID,
    validateName,
    validateSale,
    validateSaleOfProducts,
    parametersAdminValidation,
    parametersProductsValidation
}