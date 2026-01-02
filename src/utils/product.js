export const getProducts = () =>
  JSON.parse(localStorage.getItem("products")) || [];

export const saveProducts = (products) =>
  localStorage.setItem("products", JSON.stringify(products));
