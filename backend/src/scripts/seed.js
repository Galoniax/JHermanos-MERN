import mongoose from 'mongoose';
import { connectDB } from '../core/database/database.js';
import Product from '../core/models/Product.js';
import Category from '../core/models/Category.js';

import { PRODUCTS } from '../../data/productos.js';
import { sluglify } from '../shared/utils/sluglify.js';

async function seedDatabase() {
  try {
    console.log('Conectando a la base de datos para seeding...');
    await connectDB();

    console.log('Limpiando colecciones anteriores...');
    await Product.deleteMany({});
    await Category.deleteMany({});

    // 1. Extraer y crear categorías únicas
    const categorias = [
      ...new Set(PRODUCTS.map((p) => p.category).filter(Boolean)),
    ];
    console.log('Categorías detectadas:', categorias);

    const categoryMap = {};
    for (const category of categorias) {
      if (category) {
        const cat = await Category.create({ name: category, products: [] });
        categoryMap[category] = cat._id;
      }
    }

    // 2. Insertar productos
    const products = PRODUCTS.map((p) => {
      const category_id = categoryMap[p.category];

      return {
        ...p,
        category: category_id,
        finalPrice: p.discount
          ? Math.floor((p.price - p.price * (p.discount / 100)) * 100) / 100
          : p.price,
        slug: sluglify(p.name),
      };
    });

    console.log(products);

    const inserted = await Product.insertMany(products);
    console.log(
      `Se insertaron con éxito ${inserted.length} productos en MongoDB.`
    );

    // 3. Vincular productos a sus categorías
    for (const prod of inserted) {
      if (mongoose.Types.ObjectId.isValid(prod.category)) {
        await Category.findByIdAndUpdate(prod.category, {
          $push: { products: prod._id },
        });
      }
    }

    console.log('¡Seeding completado con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('Error durante el seeding de base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();
