import express from 'express';
import productsRoute from './routes/products.route.js'; // Asegúrate de que el archivo existe y tiene extensión .js
import cartsRoute from "./routes/carts.route.js"

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/products', productsRoute);

app.use('/api/carts', cartsRoute);

app.listen(8080, () => {
    console.log('Servidor ON en puerto 8080');
});