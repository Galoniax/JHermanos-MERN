import { interceptor } from "../api/interceptor/axios-interceptor";

// Crear orden de compra
export const createOrder = async (orderData) => {
  return await interceptor.post("/orders", orderData);
};

// Obtener órdenes de compra
export const getOrders = async () => {
  return await interceptor.get("/orders");
};
