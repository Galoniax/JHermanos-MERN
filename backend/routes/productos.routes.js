import express from "express";
import { PRODUCTOS } from "../data/productos.js";
import Product from "../src/core/models/Product.js";

const router = express.Router();

/**
 * GET /api/productos
 * Obtiene la lista completa de productos desde MongoDB o fallback local.
 * Soporta filtro opcional por categoría: ?category=Living o ?categoria=Living
 */
router.get("/", async (req, res) => {
  const { category, categoria } = req.query;
  const filterCategory = (category || categoria)?.trim().toLowerCase();

  try {
    const mongoProducts = await Product.find({ active: true }).lean();
    if (mongoProducts && mongoProducts.length > 0) {
      let result = mongoProducts.map((p) => ({
        ...p,
        _id: p.slug || p._id,
        id: p.slug || p._id,
        price: Number(p.price) || 0,
      }));

      if (filterCategory) {
        result = result.filter((p) => {
          const cat = (p.category || p.categoria || "").toString().toLowerCase();
          return cat === filterCategory;
        });
      }
      return res.json(result);
    }
  } catch (err) {
    console.warn("Consulta a MongoDB no disponible, usando catálogo local:", err.message);
  }

  // Fallback seguro con catálogo local en memoria
  if (filterCategory) {
    const filtrados = PRODUCTOS.filter((p) => {
      const cat = (p.category || p.categoria || "").toLowerCase();
      return cat === filterCategory;
    });
    return res.json(filtrados);
  }

  res.json(PRODUCTOS);
});

/**
 * GET /api/productos/:id
 * Obtiene un producto individual por id o slug (ej: "aconcagua", "1", etc.)
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const searchId = id.trim().toLowerCase();

  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(searchId);
    const query = isObjectId
      ? { $or: [{ slug: searchId }, { _id: searchId }] }
      : { slug: searchId };

    const mongoProduct = await Product.findOne(query).lean();

    if (mongoProduct) {
      return res.json({
        ...mongoProduct,
        _id: mongoProduct.slug || mongoProduct._id,
        id: mongoProduct.slug || mongoProduct._id,
        price: Number(mongoProduct.price) || 0,
      });
    }
  } catch {
    // Si falla consulta a Mongo, continúa con catálogo local
  }

  const local = PRODUCTOS.find((p) => {
    const pId = String(p.id ?? "").toLowerCase();
    const pUnderscoreId = String(p._id ?? "").toLowerCase();
    return pId === searchId || pUnderscoreId === searchId;
  });

  if (!local) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(local);
});

export default router;