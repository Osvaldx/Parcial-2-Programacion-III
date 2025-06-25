const parametersValidation = (nombre,imagen,precio,categoria) => {
    const regEx = new RegExp("^https://[a-zA-Z0-9].{3,}")
    let result = {
        allow: true,
        message: ""
    }
    
    if(!nombre){
        result.allow = false;
        result.message = "El nombre no puede ser null o vacio"
        
        return result
    }

    if(!regEx.test(imagen) || !imagen) {
        result.allow = false;
        result.message = "La imagen no respeta el formato o esta vacio"
        
        return result
    }

    if(precio < 0) {
        result.allow = false;
        result.message = "El precio no puede ser negativo"
        
        return result
    }

    if(categoria != "SKATE" && categoria != "ROLLER") {
        result.allow = false;
        result.message = "La categoria no es correcta"
        
        return result
    }
    
    return result
}

const isParameter = (param) => {
    const parameters = ["nombre","imagen","precio","categoria","activo"];
    return (parameters.includes(param))
}

export default { parametersValidation,isParameter };