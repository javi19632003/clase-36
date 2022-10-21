import dotenv                   from "dotenv";
import express                  from "express";
import {rutaCarrito, rutaProductos} from './rutas/index.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use('/api/productos', rutaProductos)
app.use('/api/carrito', rutaCarrito)

const server = app.listen(PORT, () => {
    console.log(`server funcionando en port http://localhost:${PORT}`);
  });
  server.on("error", (err) => console.error(err));
  
