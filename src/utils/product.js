export const getProducts = () =>
  JSON.parse(localStorage.getItem("products")) || [];

export const saveProducts = (products) =>
  localStorage.setItem("products", JSON.stringify(products));

export const getProductsByFarmer = (farmerEmail) =>
  getProducts().filter((p) => p.farmerEmail === farmerEmail);

export const getProductsBySearch = (query) => {
  const q = query.toLowerCase();
  return getProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.location && p.location.toLowerCase().includes(q))
  );
};
