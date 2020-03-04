const express = require("express");
const router = express.Router();

const HowTos = require("../data/helpers/howTosModel.js");

const {
  validateHowToPost,
  validateHowToPut,
  validateHowToId
} = require("../middleware/middleware.js");

// GET "/api/how-tos"
router.get("/", (req, res) => {
  HowTos.find()
    .then((howTos) => res.json(howTos))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET "/api/how-tos/:id"
router.get("/:id", validateHowToId, (req, res) => {
  res.json(req.howTo);
});

// POST "/api/how-tos"
router.post("/", validateHowToPost, (req, res) => {
  HowTos.add(req.body)
    .then((howTo) => res.status(201).json(howTo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT "/api/how-tos/:id"
router.put("/:id", validateHowToPut, (req, res) => {
  HowTos.update({ id: req.params.id }, req.body)
    .then((howTo) => res.status(200).json(howTo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE "/api/how-tos/:id"
router.delete("/:id", validateHowToId, (req, res) => {
  HowTos.remove({ id: req.params.id })
    .then((count) =>
      res.status(200).json({ message: `${count} record was deleted.` })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
