import parametersValidation from "../validations/productsParameterValidations.js";
import Products from "../models/product.models.js";

export const getProducts = async(req, res) => {
    try {
        const [rows] = await Products.selectAllProducts();
        
        res.status(200).json({
            payload: rows,
            message: (rows.length === 0) ? "[-] No se encontraron productos" : "[+] Productos encontrados"
        })
    }
    catch(error) {
        res.status(500).json({error: "[!] Error interno del servidor al obtener productos"})
        console.log("Error: " + error)
    }
}

export const getProductID = async(req,res) => {
    try {
        let { id } = req.params  //-> desestructuracion a un objeto
        const [rows] = await Products.SelectProductFromID(id);

        res.status(200).json({
            payload: rows,
            message: (rows.length === 0) ? "[-] No se encontro producto con ese ID" : "[+] Producto encontrado"
        })
    } catch (error) {
        res.status(500).json({error: "[!] Error interno del servidor al obtener productos"})
        console.log("Error: " + error)
    }
}

export const insertProduct = async(req, res) => {
    try {
        let { nombre, imagen, precio, categoria, activo } = req.body
        let results = parametersValidation(nombre, imagen, precio, categoria, activo);
        if(!results.allow) {
            return res.status(404).json({
                error: results.message
            })
        }

        const [rows] = await Products.insertNewProduct(nombre, imagen, precio, categoria, activo);
        
        return res.status(200).json({
            message: (rows.length === 0) ? "[-] NO SE AGREGO EL PRODUCTO" : "[+] PRODUCTO AGREGADO"
        })
    } catch (error) {
        res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
        console.log("Error: " + error)
    }
}

export const deleteProduct = async(req, res) => {
    try {
        let { id } = req.params;
        let [rows] = await Products.deleteProductFromID(id);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "[!] No existe producto con esa ID"
            });
        } else {
            return res.status(200).json({
                message: "[+] Producto eliminado"
            });
        }
    } catch (error) {
        res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
        console.log("Error: " + error)
    }
}

export const updateProduct = async(req, res) => {
    try {
        let { id_product, nombre, imagen, precio, categoria, activo } = req.body;

        let results = parametersValidation(nombre,imagen,precio,categoria,activo);
        if(!results.allow) {
            return res.status(400).json({
                error_message: results.message
            })
        }

        let [rows] = await Products.updateProductFromID(nombre,imagen,precio,categoria,activo,id_product);

        return res.status(200).json({
            message: (rows.affectedRows === 0) ? "[!] No se encontro un producto con ese ID" : "[+] Producto actualizado con exito!"
        })

    } catch (error) {
        res.status(500).json({error: "[!] ERROR INTERNO DEL SERVIDOR"})
        console.log("Error: " + error)
    }
}