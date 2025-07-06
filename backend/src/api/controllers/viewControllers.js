import Products from "../models/product.models.js";

export const listView = async (req, res) => {
    try {
        const listProducts = await Products.selectAllProducts();

        res.render("index", {
            products: listProducts[0]
        });
    }
    catch(error) {

    }
}

export const searchProductIDView = async (req, res) => {
    res.render("searchProduct");
}

export const addProductView = async (req, res) => {
    res.render("addProduct");
}

export const updateProductView = async (req, res) => {
    res.render("updateProduct");
}

export const deleteProductView = async (req, res) => {
    res.render("deleteProduct");
}

export const createAdminView = async (req, res) => {
    res.render("createAdmin");
}

export const deleteAdminView = async (req, res) => {
    res.render("deleteAdmin");
}