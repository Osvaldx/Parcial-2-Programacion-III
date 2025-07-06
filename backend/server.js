import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import morgan from "morgan";
import { productRouter, viewRouter, adminRouter } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

const app = express();
const PORT = environments.port;

// Configuramos el EJS como motor de plantillas
app.set("view engine", "ejs");

// Definimos la ruta donde esta almacenada las plantillas EJS con join
// combinamos el directorio raiz del proyecto con src/views
app.set("views", join(__dirname, "src/views"));

// Configuramos express para servir archivos estaticos desde la carpeta public
app.use(express.static(join(__dirname, "src/public")));

//MIDDLEWARES
app.use(cors()); // MIDDLEWARE basico para permitir solicitudes
app.use(express.json()); // MIDDLEWARE PARA PODER RECIBIR COSAS DEL BODY EN EL POST
app.use(morgan("dev")) // MIDDLEWARE para registrar los metodos http

// VISTAS
// ------------------------------------------------------------------------------------------ //
app.use("/dashboard", viewRouter);
// ------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------------------------ //
app.use("/api", productRouter);
// ------------------------------------------------------------------------------------------ //
app.use("/api", adminRouter);
// ------------------------------------------------------------------------------------------ //

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`)
});