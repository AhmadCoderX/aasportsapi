const router = require("express").Router();
const {
  getOrder,
  getAllOrders,
  createOrder,
} = require("../controllers/orders.controller");
// const verifyToken = require("../middleware/verifyToken");

router.route("/create").post(createOrder);

router.route("/").get(getAllOrders);

router.route("/:id").get(getOrder);

module.exports = router;
