export const parametersValidation = (nombre,imagen,precio,categoria, activo) => {
    const regEx = new RegExp("^https://[a-zA-Z0-9].{3,}")
    let result = {
        allow: true,
        message: ""
    }

    if(!nombre || !imagen || !precio || !categoria){
        result.allow = false;
        result.message = "[!] Debe completarse todos los campos"
        
        return result
    }

    if(!regEx.test(imagen)) {
        result.allow = false;
        result.message = "[!] La imagen no respeta el formato o esta vacio"
        
        return result
    }

    if(precio < 0) {
        result.allow = false;
        result.message = "[!] El precio no puede ser negativo"
        
        return result
    }

    if(categoria != "SKATE" && categoria != "ROLLER") {
        result.allow = false;
        result.message = "[!] La categoria no es correcta"
        
        return result
    }

    if(activo != true && activo != false) {
        result.allow = false;
        result.message = "[!] El activo no es un booleano"

        return result
    }
    
    return result
}