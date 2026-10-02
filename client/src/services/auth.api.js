import { interceptor } from "../api/interceptor/axios-interceptor";

export const getMe = async () => {
  return await interceptor.get("/auth/me");
};

export const login = async (email, password) => {
  return await interceptor.post("/auth/login", { email, password });
};

export const register = async (user, token) => {
  const payload = {
    email: user.email || null,
    password: user.password || null,
    phone: user.phone || null,
    dni: user.dni || null,
  };

  return await interceptor.post("/auth/register", { user: payload, token });
};

export const OAuth = async (provider) => {
  switch (provider) {
    case "google":
      return interceptor.defaults.baseURL + "/auth/google";
    default:
      throw new Error("No se encontro el provider");
  }
};

export const logout = async () => {
  return await interceptor.post("/auth/logout");
};

