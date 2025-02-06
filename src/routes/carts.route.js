import { Router } from "express";

const route = Router();

// Simulación de base de datos en memoria para los carritos
const carritos = {};

// Método POST para crear un carrito o agregar productos en batch
route.post('/:id', (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  if (!carritos[id]) {
    carritos[id] = { id, products: [] };
  }

  if (!Array.isArray(products)) {
    return res.status(400).json({ message: "El campo 'products' debe ser un array de objetos" });
  }

  carritos[id].products.push(...products);

  return res.status(201).json({
    message: `Productos agregados al carrito con id ${id}`,
    carrito: carritos[id],
  });
});

// Método GET para obtener los productos de un carrito
route.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const carrito = carritos[cid];

  if (!carrito) {
    return res.status(404).json({ message: `Carrito con id ${cid} no encontrado` });
  }

  return res.status(200).json({
    message: `Productos del carrito con id ${cid}`,
    products: carrito.products,
  });
});

// Método POST para agregar un producto al carrito por nombre y pid
route.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { product } = req.body; // Nombre del producto enviado en el body

  // Verificar si el carrito existe
  if (!carritos[cid]) {
    return res.status(404).json({ message: `Carrito con id ${cid} no encontrado` });
  }

  // Verificar si el nombre del producto fue enviado
  if (!product) {
    return res.status(400).json({ message: "Se requiere el nombre del producto en el body" });
  }

  // Agregar el producto al carrito
  carritos[cid].products.push({ product: pid, name: product });

  return res.status(201).json({
    message: `Producto '${product}' agregado al carrito con id ${cid}`,
    carrito: carritos[cid],
  });
});

export default route;
