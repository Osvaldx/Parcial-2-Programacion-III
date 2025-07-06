export const dateLoginValidation = (username, password) => {
    const regExNombre = new RegExp("^[a-zA-Z0-9]+$");
    let result = {
        allow: true,
        message: ""
    }

    if(!regExNombre.test(username) || !username) {
        result.allow = false;
        result.message = "[!] El usuario no es valido o esta vacio";
        return result;
    }

    if(!password) {
        result.allow = false;
        result.message = "[!] La contraseña esta vacia o no es valida"
        return result;
    }

    return result;
}