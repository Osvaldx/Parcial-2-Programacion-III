import { Router } from "express";
import { registerClient } from "../controllers/clienteControllers.js";
import middlewares from "../middlewares/middlewares.js";

const router = Router();

router.post("/cliente/registrarCliente",middlewares.validateName, registerClient);

export default router;