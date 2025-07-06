const parametersValidation = (correo,nombre,contraseña) => {
    const regExCorreo = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"); // regex para validar el correo
    const regExNombre = new RegExp("^[a-zA-Z0-9]+$");
    let result = {
        allow: true,
        message: ""
    }

    if(!regExCorreo.test(correo) || !correo) {
        result.allow = false;
        result.message = "[!] Correo no valido o vacio";
        return result;
    }
    
    if(!regExNombre.test(nombre) || !nombre) {
        result.allow = false;
        result.message = "[!] Nombre no valido o vacio";
        return result;
    }

    if(!contraseña) {
        result.allow = false;
        result.message = "[!] La contraseña no puede estar vacia"
    }

    return result;
}

const ValidateID = (id) => {
    const regEx = new RegExp("^[0-9]+$")
    return regEx.test(id);
}

export default {
    parametersValidation,
    ValidateID
}