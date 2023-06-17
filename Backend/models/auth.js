const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Success",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Some error has occured" });
  }
});

router.get("/login", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log In Failure",
  });
});

router.get(
  "/google/secrets",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login",
  })
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"],
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CIENT_URL);
  });
});

module.exports = router;
