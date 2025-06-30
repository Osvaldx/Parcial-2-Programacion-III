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


export default {
    validateID
}