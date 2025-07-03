/////////////////////////////////////////////////////////////////////////////////
// Crear la logica para trabajar con rutas y archivos del proyecto en Express.js
/////////////////////////////////////////////////////////////////////////////////

// Convierte la URL de un archivo en una ruta valida del Sistema Operativo (/home/usuario/proyecto)
import { fileURLToPath } from "url";

// dirname extrae el directorio padre de una ruta
// join une rutas como si fuera path.join(...) esto nos sirve para construir rutas
import { dirname, join } from "path";

// import.meta.url contiene la URL del archivo actual (file://home/user/project/src/api/utils/index.js)
// fileURLToPath -> La convierte en ruta local del sistema de archivos (/home/user/project/src/api/utils/index.js)
const __filename = fileURLToPath(import.meta.url);

// dirname(__filename) -> da el directorio actual del archivo
const __dirname = join(dirname(__filename), "../../../"); // Apuntamos a la raiz del proyecto

// Exportamos dirname y join para que otros archivos puedan importar y usar estas herramientas
export {
    __dirname,
    join
}