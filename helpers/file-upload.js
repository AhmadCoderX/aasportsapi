const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads")); // Save images in uploads folder
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    const uniqueFileName = Date.now() + "-" + originalFilename;
    req.imageNames = req.imageNames || [];
    req.imageNames.push(uniqueFileName);
    cb(null, uniqueFileName); // Generate unique filename with timestamp
  },
});

const upload = multer({ storage });

module.exports = { upload };
