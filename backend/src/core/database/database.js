import mongoose, { version } from "mongoose";
import { MONGODB_URI } from "../config/config.js";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true}}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, clientOptions);
    console.log(`Conectado a la base de datos ${mongoose.connection.db.namespace} en: ${mongoose.connection.host} `);
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  }
};