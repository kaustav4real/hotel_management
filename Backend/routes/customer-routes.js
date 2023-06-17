const express = require("express");

const customerControllers = require("../controllers/customer_controller");

const router = express.Router();

router.get("/profile", customerControllers.userProfile);

module.exports = router;
