// Convierte un producto de la API al formato que usa el front.
// Acepta el formato del productos.json (nombre, precio, imagen...)
// y el del modelo de Mongo de Axel (name, price, image_url, _id...).
// Brisa puede reutilizarlo en ProductDetail.

const toNumber = (value) => {
  if (value && typeof value === "object" && "$numberDecimal" in value) {
    return Number(value.$numberDecimal);
  }
  return Number(value);
};

const toImageSrc = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `/${String(path).replace(/^\//, "")}`;
};

export function normalizeProduct(p) {
  const categoria = p.categoria ?? p.category;

  return {
    id: p.id ?? p._id,
    nombre: p.nombre ?? p.name,
    precio: toNumber(p.precio ?? p.price),
    imagen: toImageSrc(p.imagen ?? p.image_url),
    categoria:
      categoria && typeof categoria === "object" ? categoria.name : categoria,
    descripcionCorta: p.descripcionCorta ?? p.description,
    stock: typeof p.stock === "number" ? p.stock : undefined,
  };
}

// La lista puede venir como array directo o dentro de { data / products / productos }
export function normalizeProductList(data) {
  const list = Array.isArray(data)
    ? data
    : (data?.data ?? data?.products ?? data?.productos ?? []);
  return list.map(normalizeProduct);
}
