const fs = require("fs");
const router = require("express").Router();

const { pool } = require("../models/database");
const hostControllers = require("../controllers/host_controllers");
const upload = require("../middleware/imageUpload");
const { log } = require("console");

router.get("/", hostControllers.homeDisplay);

router.post("/api/hostYourGym", hostControllers.setUpHostProfile);

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

router.get("/secrets", checkAuthenticated, hostControllers.checkAuth);

router.post(
  "/api/uploadFile",
  upload.single("myFile"),
  hostControllers.uploadImage
);

router.get(
  "/hostedPropertyImages",
  hostControllers.getHostedUsersPropertyImages
);

router.post("/deletePropertyImages", (req, res) => {
  const result = JSON.parse(req.body.imageData);
  const filename = result.imageName;
  fs.unlink("public" + "/files/" + filename, (error) => {
    if (!error) {
      pool.query(
        "DELETE FROM imageurl WHERE imageurl=$1",
        [filename],
        (errors, results) => {
          if (!error) {
            res
              .status(200)
              .json({
                message:
                  "Image Has Been Successfully deleted. Refresh to see the results.",
              });
          }
        }
      );
    } else {
      console.log(error);
    }
  });
});

module.exports = router;

/*
SELECT owner_id,gym_name, address,price,description,array_agg(imageurl) 
FROM gyms, imageurl WHERE gyms.owner_id=imageurl.user_id GROUP BY gyms.owner_id */
