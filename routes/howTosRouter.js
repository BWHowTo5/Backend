const express = require("express");
const router = express.Router();

const HowTos = require("../data/helpers/howTosModel.js");

// GET "/api/how-tos"
router.get("/", (req, res) => {
  HowTos.find()
    .then((howTos) => res.json(howTos))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
