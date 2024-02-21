const pool = require("../config/db");
const createCartDb = async (customerId) => {
  const { rows: cart } = await pool.query(
    "INSERT INTO cart(customer_id) VALUES ($1) RETURNING cart.id",
    [customerId]
  );
  return cart[0];
};

const getCartDb = async (customerId) => {
  // get cart items
  const cart = await pool.query(
    `SELECT product.*, cart_item.quantity, round((10 * cart_item.quantity)::numeric, 2) as subtotal from customer
      join cart on customer.id = cart.customer_id
      join cart_item on cart.id = cart_item.cart_id
      join product on product.id = cart_item.product_id
      where customer.id = $1
      `,
    [customerId]
  );

  return cart.rows;
};
// select product.* , cart_item.quantity, round((10*cart_item.quantity)::numeric, 2) as subtotal, customer.name from customer join cart on customer.id = cart.customer_id join cart_item on cart.id = cart_item.cart_id join product on product.id = cart_item.product_id where customer.id = 'f17fce3a-1c2b-4beb-aa65-03d4d445d968';

//  INSERT INTO cart_item(cart_id, product_id, quantity) VALUES ('59b1e681-fba1-4719-8581-f64324bf3200', '2f8ea03d-504b-4878-829c-b7e876fd50ec', 4) ON CONFLICT (cart_id, product_id) DO UPDATE SET quantity = cart_item.quantity + 1 RETURNING *;
// add item to cart
const addItemDb = async ({ cart_id, product_id, quantity }) => {
  await pool.query(
    `INSERT INTO cart_item(cart_id, product_id, quantity) 
         VALUES($1, $2, $3) ON CONFLICT (cart_id, product_id) 
        DO UPDATE set quantity = cart_item.quantity + 1 returning *`,
    [cart_id, product_id, quantity]
  );

  const results = await pool.query(
    "Select product.*, cart_item.quantity, round((10 * cart_item.quantity)::numeric, 2) as subtotal from cart_item join product on cart_item.product_id = product.id where cart_item.cart_id = $1",
    [cart_id]
  );

  return results.rows;
};

// delete item from cart
const deleteItemDb = async ({ cart_id, product_id }) => {
  const result = await pool.query(
    "delete from cart_item where cart_id = $1 AND product_id = $2 returning *",
    [cart_id, product_id]
  );
  return result.rows[0];
};

// increment item quantity by 1
const increaseItemQuantityDb = async ({ cart_id, product_id }) => {
  await pool.query(
    "update cart_item set quantity = quantity + 1 where cart_item.cart_id = $1 and cart_item.product_id = $2",
    [cart_id, product_id]
  );

  const results = await pool.query(
    `Select product.*, cart_item.quantity, 
       round((10 * cart_item.quantity)::numeric, 2) as subtotal
       from cart_item join product 
       on cart_item.product_id = product.id 
       where cart_item.cart_id = $1
      `,
    [cart_id]
  );
  return results.rows;
};

// decrement item quantity by 1
const decreaseItemQuantityDb = async ({ cart_id, product_id }) => {
  await pool.query(
    "update cart_item set quantity = quantity - 1 where cart_item.cart_id = $1 AND cart_item.product_id = $2 returning *",
    [cart_id, product_id]
  );

  const results = await pool.query(
    "Select product.*, cart_item.quantity, round((10 * cart_item.quantity)::numeric, 2) as subtotal from cart_item join product on cart_item.product_id = product.id where cart_item.cart_id = $1",
    [cart_id]
  );
  return results.rows;
};

const emptyCartDb = async (cartId) => {
  return await pool.query("delete from cart_item where cart_id = $1", [cartId]);
};

module.exports = {
  createCartDb,
  getCartDb,
  addItemDb,
  increaseItemQuantityDb,
  decreaseItemQuantityDb,
  deleteItemDb,
  emptyCartDb,
};
