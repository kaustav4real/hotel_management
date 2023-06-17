const { pool } = require("../models/database");

exports.homeDisplay = async function (req, res) {
  try {
    const { rows } = await pool.query(
      " SELECT owner_id,gym_name, address,price,description, array_agg(imageurl) FROM gyms, imageurl WHERE gyms.owner_id=imageurl.user_id GROUP BY gyms.owner_id;"
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status("500").json("An unexpected error has occured");
  }
};

exports.checkAuth = function (req, res) {
  const googleID = req.user.id;
  pool.query(
    "SELECT owner_id FROM gyms WHERE owner_id=$1",
    [googleID],
    (error, results) => {
      if (!error && results.rowCount === 1) {
        res.redirect(`/profile`);
      } else {
        res.redirect("/");
      }
    }
  );
};

exports.setUpHostProfile = function (req, res) {
  if (req.isAuthenticated()) {
    const ownerID = req.user.id;
    const gymName = req.body.gymName;
    const address = req.body.address;
    const price = req.body.price;
    const description = req.body.description;
    pool.query(
      "INSERT INTO gyms (owner_id,gym_name,address,price,description) VALUES($1,$2,$3,$4,$5)",
      [ownerID, gymName, address, price, description],
      (error, results) => {
        if (!error) {
          res.redirect(`/profile`);
        } else {
          console.log(error);
        }
      }
    );
  }
};

exports.uploadImage = function (req, res) {
  const imageLink = req.file.filename;
  const userId = req.body.HOST_ID_VALUE;
  pool.query(
    "INSERT INTO imageurl (imageurl,user_id) VALUES($1,$2)",
    [imageLink, userId],
    (error, results) => {
      if (!error) {
        res
          .status(200)
          .json({ message: "Image has been uploaded successfully." });
      } else {
        res.status(500).json({ message: "Error detect korilu dei" });
      }
    }
  );
};

exports.getHostedUsersPropertyImages = function (req, res) {
  const userID = req.user.id;
  pool.query(
    "SELECT imageurl FROM imageurl WHERE user_id=$1",
    [userID],
    (error, results) => {
      if (!error) {
        res.status(200).json({ finalResult: results.rows });
      } else {
        res
          .status(500)
          .json({ finalResult: "An unexpected error has occured" });
      }
    }
  );
};
