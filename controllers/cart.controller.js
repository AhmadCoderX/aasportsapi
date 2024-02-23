const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
  const { user_id } = req.body.user;

  // get cart items
  const cart = await cartService.getCart(user_id);
  res.json({ items: cart });
};

// add item to cart
const addItem = async (req, res) => {
  // const cart_id = req.body.user.cart_id; // request.user.cart_id

  const cart = await cartService.addItem(req.body.user);
  res.status(200).json({ data: cart });
};

// delete item from cart
const deleteItem = async (req, res) => {
  const { product_id, cart_id } = req.body.user;
  // const cart_id = req.user.cart_id;

  const data = await cartService.removeItem({ cart_id, product_id });
  res.status(200).json(data);
};

// increment item quantity by 1
const increaseItemQuantity = async (req, res) => {
  const { product_id, cart_id } = req.body.user;
  // const cart_id = req.user.cart_id;

  const cart = await cartService.increaseQuantity({ cart_id, product_id });
  res.json(cart);
};

// decrement item quantity by 1
const decreaseItemQuantity = async (req, res) => {
  const { product_id, cart_id } = req.body.user;
  // const cart_id = req.user.cart_id;

  const cart = await cartService.decreaseQuantity({ cart_id, product_id });
  res.json(cart);
};

module.exports = {
  getCart,
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
};
