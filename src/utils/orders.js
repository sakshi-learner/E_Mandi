const ORDERS_KEY = "orders";

export const getOrders = () =>
  JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

export const saveOrders = (orders) =>
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

export const placeOrder = (order) => {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
};

export const getOrdersByBuyer = (buyerEmail) =>
  getOrders().filter(o => o.buyerEmail === buyerEmail);

export const getOrdersByFarmer = (farmerEmail) =>
  getOrders().filter(o => o.farmerEmail === farmerEmail);
