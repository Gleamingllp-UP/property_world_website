export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(price);
};
