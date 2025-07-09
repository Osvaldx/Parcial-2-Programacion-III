import { Router } from "express";
import middlewares from "../middlewares/middlewares.js";
import { createAdminAccount, deleteAdminAccount, checkAdminAccount, getAllAdminAccounts } from "../controllers/adminControllers.js";
// El resto de las funciones que vienen de los controladores

const router = Router();

router.get("/admin/getAllAdmins", getAllAdminAccounts);

router.post("/admin/checkAdmin",middlewares.parametersAdminValidation, checkAdminAccount);

router.post("/admin/createAccount",middlewares.parametersAdminValidation, createAdminAccount);

router.delete("/admin/deleteAccount/:id",middlewares.validateID, deleteAdminAccount);

export default router;