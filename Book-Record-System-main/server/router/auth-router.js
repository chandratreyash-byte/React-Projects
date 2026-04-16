const express = require('express');
const router = express.Router();
const controller = require("../controllers/auth-controller")
const protect = require("../middleware/authmiddelware");

router.route("/signup").post(controller.signup);
router.route("/login").post(controller.login);
router.post("/logout",controller.logout);

router.get("/me", protect, (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
  });
});



module.exports = router;