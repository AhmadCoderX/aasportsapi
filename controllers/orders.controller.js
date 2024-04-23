const orderService = require("../services/orders.service");
const cartService = require("../services/cart.service");

const createOrder = async (req, res) => {
  const { amount, itemTotal, paymentMethod, ref } = req.body;
  const userId = req.body.user.id;
  const cartId = req.body.user.cart_id;

  const newOrder = await orderService.createOrder({
    cartId,
    amount,
    itemTotal,
    userId,
    paymentMethod,
    ref,
  });

  // delete all items from cart_items table for the user after order has been processed
  await cartService.emptyCart(cartId);

  res.status(201).json(newOrder);
};

const getAllOrders = async (req, res) => {
  const { page = 1 } = req.query;
  const userId = req.body.user.id;

  const orders = await orderService.getAllOrders(userId, page);
  res.json(orders);
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.user.id;

  const order = await orderService.getOrderById({ id, userId });
  res.json(order);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
};
