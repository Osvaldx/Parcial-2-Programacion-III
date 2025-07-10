
# SkateSports – Parcial 2 Programación III

Sistema web para gestionar y mostrar productos de skate y roller.
Consta de un backend en **Node.js/Express** (con **EJS** para las vistas) y un frontend estático con **HTML**, **CSS** y **JavaScript**.

---

## Requisitos

- Node.js y npm
- MySQL (para la base de datos)
- Archivo `.env` con las variables de entorno necesarias

---

## Instalación

1. Clonar el repositorio.

2. Dentro del directorio `backend` instalar las dependencias:

   ```bash
   cd backend
   npm install
   ```

3. Crear un archivo `.env` con la configuración de la base de datos y el puerto:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_NAME=nombre_de_tu_base
   DB_USER=usuario
   DB_PASSWORD=contraseña
   ```

---

## Ejecución

Desde la carpeta `backend`:

```bash
npm run dev  # inicia el servidor con nodemon
```

El servidor quedará accesible en `http://localhost:PORT`.

La carpeta `frontend` contiene los archivos HTML estáticos para los clientes.

---

## Estructura del proyecto

```
backend/
  server.js
  package.json
  src/
    api/
      controllers/   # lógica de negocio de productos y administradores
      routes/        # rutas de la API y vistas
      models/        # consultas MySQL
      validations/   # validaciones de parámetros
      middlewares/   # middlewares de Express
      utils/         # utilidades (manejo de rutas)
    views/           # plantillas EJS
    public/          # recursos estáticos (CSS, JS, imágenes)
frontend/
  css/               # estilos para el frontend
  js/                # scripts del cliente
  pages/             # páginas adicionales (admin y cliente)
  index.html         # página principal
```

---

## Endpoints principales

### Productos

- **GET** `/api/products` – Obtener todos los productos
- **GET** `/api/products/:id` – Obtener producto por ID
- **POST** `/api/products/add` – Agregar un producto
- **PUT** `/api/products/update` – Actualizar producto
- **DELETE** `/api/products/delete/:id` – Eliminar producto

### Administradores

- **GET** `/api/admin/getAllAdmins` – Listar administradores
- **POST** `/api/admin/checkAdmin` – Verificar credenciales
- **POST** `/api/admin/createAccount` – Crear administrador
- **DELETE** `/api/admin/deleteAccount/:id` – Eliminar administrador

### Clientes

- **POST** `/api/cliente/registrarCliente` – Registrar al cliente

### Ventas

- **POST** `/api/venta/registrarVenta` – Registrar la venta realizada por un cliente
- **POST** `/api/venta/registrarVentaProd` – Registrar todos los productos de la venta realizada

### Vistas

- `/dashboard` – Panel de administración (EJS)
- `/dashboard/searchProduct` – Buscar un producto (EJS)
- `/dashboard/addProduct` – Añadir un producto a la DB (EJS)
- `/dashboard/updateProduct` – Modificar un producto en la DB (EJS)
- `/dashboard/deleteProduct` – Eliminar un producto de la DB (EJS)
- `/dashboard/createAdmin` – Crear un administrador para el dashboard (EJS)
- `/dashboard/deleteAdmin` – Eliminar un administrador para el dashboard (EJS)

---

## Notas

- En la carpeta `frontend/js` se encuentran las funciones para manejar el carrito de compras, la interacción con la API y las validaciones del lado del cliente.

- El frontend hace uso de `localStorage` para guardar el carrito y de `sessionStorage` para el nombre de usuario.

- El proyecto utiliza **MySQL** mediante `mysql2/promise` para conectar con la base de datos.
