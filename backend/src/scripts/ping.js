import mongoose from "mongoose";

import { connectDB } from "../core/database/database.js";

async function ping() {
  try {
    await connectDB();

    await mongoose.connection.db.admin().ping();
    console.log("Ping exitoso a MongoDB con Mongoose");
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

ping();
