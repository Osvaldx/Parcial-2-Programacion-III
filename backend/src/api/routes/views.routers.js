import { Router } from "express";
import { addProductView, deleteProductView, listView, searchProductIDView, updateProductView, createAdminView, deleteAdminView } from "../controllers/viewControllers.js";

const router = Router();

router.get("/", listView)

router.get("/searchProduct", searchProductIDView)

router.get("/addProduct", addProductView)

router.get("/updateProduct", updateProductView)

router.get("/deleteProduct", deleteProductView)

router.get("/createAdmin", createAdminView)

router.get("/deleteAdmin", deleteAdminView)

export default router;