import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import morgan from "morgan";
import { productRouter } from "./src/api/routers/index.js";

const app = express();
const PORT = environments.port;

//MIDDLEWARES
app.use(cors()); // MIDDLEWARE basico para permitir solicitudes
app.use(express.json()); // MIDDLEWARE PARA PODER RECIBIR COSAS DEL BODY EN EL POST
app.use(morgan("dev")) // MIDDLEWARE para registrar los metodos http

// ------------------------------------------------------------------------------------------ //
// GET PRODUCTS
app.use("/api", productRouter);
// ------------------------------------------------------------------------------------------ //
// GET PRODUCT ID
app.get("/api", productRouter);
// ------------------------------------------------------------------------------------------ //
// INSERT PRODUCT
app.post("/api", productRouter);
// ------------------------------------------------------------------------------------------ //
// DELETE PRODUCT
app.delete("/api", productRouter);
// ------------------------------------------------------------------------------------------ //
// UPDATE PRODUCT
app.post("/api", productRouter);
// ------------------------------------------------------------------------------------------ //

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
});