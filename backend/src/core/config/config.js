import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const MONGODB_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_SECRET = process.env.JWT_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const MP_PUBLIC_KEY = process.env.MP_PUBLIC_KEY;
export const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export const RESEND_KEY = process.env.RESEND_KEY;

export const CUIT = process.env.CUIT;
export const AFIP_ACCESS_TOKEN = process.env.AFIP_ACCESS_TOKEN;

export const API_PREFIX = '/api';
