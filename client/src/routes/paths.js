// Paths de navegacion
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  PRODUCTS: '/products',
  PRODUCT: (product_id) => `/product/${product_id}`,

  CONTACT: '/contacto',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
};

export const OUT_AUTH = ['/login', '/register'];
