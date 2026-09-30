// Formatea el precio del producto ($ 500.000).
// Mongo puede devolver Decimal128 como { $numberDecimal: "500000" },
// como string o como número: esta función acepta los tres.
export function toNumber(price) {
  if (price && typeof price === "object" && "$numberDecimal" in price) {
    return Number(price.$numberDecimal);
  }
  return Number(price);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(toNumber(price));
}
