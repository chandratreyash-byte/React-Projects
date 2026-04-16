const express = require("express");
const router = express.Router();
const controller = require("../controllers/book-controller");
const protect = require("../middleware/authmiddelware");
const roleMiddleware = require("../middleware/rolemiddelware");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/add", protect, roleMiddleware, upload.single("image"), controller.addBook);
router.get("/", protect, controller.getBooks);
router.get("/:id", protect, roleMiddleware, controller.getBookById);
router.put("/:id", protect, roleMiddleware, upload.single("image"),controller.updateBook);
router.delete("/:id", protect, roleMiddleware, controller.deleteBook);

module.exports = router;
