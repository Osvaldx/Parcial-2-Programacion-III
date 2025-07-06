import { Router } from "express";
import middlewares from "../middlewares/middlewares.js";
import { createAdminAccount, deleteAdminAccount } from "../controllers/adminControllers.js";
// El resto de las funciones que vienen de los controladores

const router = Router();

router.post("/admin/createAccount", createAdminAccount);

router.delete("/admin/deleteAccount/:id", deleteAdminAccount);

export default router;