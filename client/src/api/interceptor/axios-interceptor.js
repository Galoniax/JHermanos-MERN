import axios from "axios";

// CONFIGURACION DEL INTERCEPTOR (manejo de peticiones y respuestas)
export const interceptor = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR
 * Envía y declara que el sistema es "Web"
 */
interceptor.interceptors.request.use(
  (config) => {
   config.headers["X-Client-System"] = "Web";

   return config;
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Maneja las respuestas del servidor
 */
interceptor.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const backendData = error.response?.data;

    console.log("backendData", backendData)
    console.log("error.response", error.response)
    console.log("error", error)
    
    const normalizedError = {
      status: error.response?.status || 500,
      success: false,
      message: backendData?.message || "Error inesperado",
      error: backendData?.error || null,
    };

    return Promise.reject(normalizedError);
  }
);

