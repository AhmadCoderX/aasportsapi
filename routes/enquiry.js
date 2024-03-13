const router = require("express").Router();
const { sendEnquiry } = require("../controllers/enquiry.controller");

router.route("/").post(sendEnquiry);

module.exports = router;
