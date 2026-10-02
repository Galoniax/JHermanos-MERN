import express from "express";
import productos from "../data/productos.js";

const router = express.Router();

/**
 * GET /api/productos
 * Obtiene la lista completa de productos.
 * Soporta filtro opcional por categoría: ?category=Living o ?categoria=Living
 */
router.get("/", (req, res) => {
  const { category, categoria } = req.query;
  const filterCategory = (category || categoria)?.trim().toLowerCase();

  if (filterCategory) {
    const filtrados = productos.filter((p) => {
      const cat = (p.category || p.categoria || "").toLowerCase();
      return cat === filterCategory;
    });
    return res.json(filtrados);
  }

  res.json(productos);
});

/**
 * GET /api/productos/:id
 * Obtiene un producto individual por id o slug (ej: "aconcagua", "1", etc.)
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const searchId = id.trim().toLowerCase();

  const producto = productos.find((p) => {
    const pId = String(p.id ?? "").toLowerCase();
    const pUnderscoreId = String(p._id ?? "").toLowerCase();
    return pId === searchId || pUnderscoreId === searchId;
  });

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

export default router;