import mongoose from "mongoose";
import { connectDB } from "../core/database/database.js";
import Product from "../core/models/Product.js";
import Category from "../core/models/Category.js";
import productosData from "../../data/productos.js";

async function seedDatabase() {
  try {
    console.log("Conectando a la base de datos para seeding...");
    await connectDB();

    console.log("Limpiando colecciones anteriores...");
    await Product.deleteMany({});
    await Category.deleteMany({});

    // 1. Extraer y crear categorías únicas
    const categoriasUnicas = [
      ...new Set(productosData.map((p) => p.category || p.categoria)),
    ];
    console.log("Categorías detectadas:", categoriasUnicas);

    const categoryMap = {};
    for (const catName of categoriasUnicas) {
      if (catName) {
        const cat = await Category.create({ name: catName, products: [] });
        categoryMap[catName] = cat._id;
      }
    }

    // 2. Insertar productos
    const productosParaInsertar = productosData.map((p) => ({
      slug: p.id || p._id,
      name: p.name || p.nombre,
      description: p.description || p.descripcionCorta,
      longDescription: p.longDescription || p.descripcionLarga,
      price: p.price || p.precio,
      category: categoryMap[p.category || p.categoria] || p.category || p.categoria,
      specs: p.specs || [],
      stock: p.stock || 10,
      image_url: p.image_url || p.imagen,
      active: true,
    }));

    const productosInsertados = await Product.insertMany(productosParaInsertar);
    console.log(`Se insertaron con éxito ${productosInsertados.length} productos en MongoDB.`);

    // 3. Vincular productos a sus categorías
    for (const prod of productosInsertados) {
      if (mongoose.Types.ObjectId.isValid(prod.category)) {
        await Category.findByIdAndUpdate(prod.category, {
          $push: { products: prod._id },
        });
      }
    }

    console.log("¡Seeding completado con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("Error durante el seeding de base de datos:", error);
    process.exit(1);
  }
}

seedDatabase();
