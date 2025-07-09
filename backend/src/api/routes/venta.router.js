import { Router } from "express";
import { registerSale, registerSaleOfProducts } from "../controllers/ventaControllers.js";
import middlewares from "../middlewares/middlewares.js";

const router = Router();

router.post("/venta/registrarVenta",middlewares.validateSale, registerSale);

router.post("/venta/registrarVentaProd",middlewares.validateSaleOfProducts, registerSaleOfProducts);

export default router;