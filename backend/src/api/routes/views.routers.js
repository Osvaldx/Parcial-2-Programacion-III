import { Router } from "express";
import { addProductView, deleteProductView, listView, searchProductIDView, updateProductView } from "../controllers/viewControllers.js";

const router = Router();

router.get("/", listView)

router.get("/searchProduct", searchProductIDView)

router.get("/addProduct", addProductView)

router.get("/updateProduct", updateProductView)

router.get("/deleteProduct", deleteProductView)

export default router;