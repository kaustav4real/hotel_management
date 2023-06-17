const { pool } = require("../models/database");

exports.userProfile = function (req, res) {
  if (req.isAuthenticated()) {
    const owner_id = req.user.id;
    const imageSource = req.user.picture;
    const userName = req.user.displayName;
    pool.query(
      "SELECT owner_id FROM gyms WHERE owner_id=$1",
      [owner_id],
      (error, results) => {
        console.log(results);
      }
    );
    res.render("userProfile", {
      imageSource: imageSource,
      displayButton: "hideItem",
      displayImage: "displayItem",
      userName: userName,
    });
  } else {
    res.render("signUpPage", {
      imageSource: null,
      displayButton: "displayItem",
      displayImage: "hideItem",
    });
  }
};
