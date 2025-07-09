import { Router } from "express"; // middleware express.router;
import middlewares from "../middlewares/middlewares.js";
import { getProducts } from "../controllers/productControllers.js";
import { getProductID } from "../controllers/productControllers.js";
import { insertProduct } from "../controllers/productControllers.js";
import { deleteProduct } from "../controllers/productControllers.js";
import { updateProduct } from "../controllers/productControllers.js";

const router = Router();

// ------------------------------------------------------------------------------------------ //
// GET PRODUCTS
router.get("/products", getProducts);
// ------------------------------------------------------------------------------------------ //
// GET PRODUCT ID
router.get("/products/:id",middlewares.validateID, getProductID);
// ------------------------------------------------------------------------------------------ //
// INSERT PRODUCT
router.post("/products/add",middlewares.parametersProductsValidation, insertProduct);
// ------------------------------------------------------------------------------------------ //
// DELETE PRODUCT
router.delete("/products/delete/:id",middlewares.validateID, deleteProduct);
// ------------------------------------------------------------------------------------------ //
// UPDATE PRODUCT
router.put("/products/update",middlewares.parametersProductsValidation, updateProduct);
// ------------------------------------------------------------------------------------------ //

export default router;