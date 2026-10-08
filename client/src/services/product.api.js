import { interceptor } from "@/api/interceptor/axios-interceptor";

export const getProducts = async (category, page) => {
  return await interceptor.get("/product", { params: { category, page } });
};

export const getProductById = async (id) => {
  return await interceptor.get(`/product/${id}`);
};
