const express = require("express");
const router = express.Router();

const Dislikes = require("../data/helpers/dislikesModel.js");
const HowTos = require("../data/helpers/howTosModel.js");

const {
  validateDislikeShape,
  validateDislikeExistingPost,
  validateDislikeExistingDelete
} = require("../middleware/dislikesMiddleware.js");

// POST "/api/dislikes"
router.post(
  "/",
  validateDislikeShape,
  validateDislikeExistingPost,
  (req, res, next) => {
    Dislikes.add(req.body)
      .then((howTo) => {
        HowTos.update({ id: howTo.id }, { dislikes: howTo.dislikes + 1 })
          .then((updatedHowTo) => res.status(201).json(updatedHowTo))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);

// DELETE "/api/dislikes/"
router.delete(
  "/",
  validateDislikeShape,
  validateDislikeExistingDelete,
  (req, res, next) => {
    Dislikes.remove(req.body)
      .then((howTo) => {
        HowTos.update({ id: howTo.id }, { dislikes: howTo.dislikes - 1 })
          .then((updatedHowTo) => res.json(updatedHowTo))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);

module.exports = router;
