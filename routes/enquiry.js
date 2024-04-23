const router = require("express").Router();
const { sendEnquiry } = require("../controllers/enquiry.controller");
const multer = require("multer");

const upload = multer().fields([
  { name: "frontCanvasImage", maxCount: 1 },
  { name: "backCanvasImage", maxCount: 1 },
  { name: "rosterSheet", maxCount: 1 },
]);

router.route("/").post(upload, sendEnquiry);

module.exports = router;
