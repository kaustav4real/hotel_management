require("dotenv").config();
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const hostRoutes = require("./routes/host-routes");
const userRoutes = require("./routes/customer-routes");
const trainerRoutes = require("./routes/trainers-routes");
const passportStrategy = require("./models/passport");
const { pool } = require("./models/database");
const googleAuth = require("./models/auth");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public/files", express.static(path.join("public", "files")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      console.log(error);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message | "An unkown error has occured" });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/", hostRoutes);
app.use("/", userRoutes);
app.use("/", trainerRoutes);
app.use("/auth", googleAuth);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Successfull3" });
});

app.listen(9000, () => {
  console.log("Your server is working on PORT 3000.");
});
