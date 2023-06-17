const express = require("express");
const router = express.Router();

router.get("/trainers", function (req, res) {
  if (req.isAuthenticated()) {
    const imageSource = req.user.picture;
    console.log(imageSource);
    res.render("trainers", {
      status: "Logged In",
      imageSource: imageSource,
      displayButton: "hideItem",
      displayImage: "displayItem",
    });
  } else {
    res.render("trainers", {
      status: null,
      imageSource: null,
      displayButton: "displayItem",
      displayImage: "hideItem",
    });
  }
});

module.exports = router;
