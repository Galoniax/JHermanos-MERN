// Formatea el precio del producto ($ 500.000).
// Mongo puede devolver Decimal128 como { $numberDecimal: "500000" },
// como string o como número: esta función acepta los tres.
export function toNumber(price) {
  if (price && typeof price === "object" && "$numberDecimal" in price) {
    return Number(price.$numberDecimal);
  }
  return Number(price);
}

export const formatPrice = (price) => {
  if (price == null) return "$ 0";

  const formattedNumber = toNumber(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedNumber}`;
};
