const express = require("express");
const router = express.Router();

const Likes = require("../data/helpers/likesModel.js");
const HowTos = require("../data/helpers/howTosModel.js");

const {
  validateLikeShape,
  validateLikeExistingPost,
  validateLikeExistingDelete
} = require("../middleware/likesMiddleware.js");

// POST "/api/likes"
router.post(
  "/",
  validateLikeShape,
  validateLikeExistingPost,
  (req, res, next) => {
    Likes.add(req.body)
      .then((howTo) => {
        HowTos.update({ id: howTo.id }, { likes: howTo.likes + 1 })
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

// DELETE "/api/likes/"
router.delete(
  "/",
  validateLikeShape,
  validateLikeExistingDelete,
  (req, res, next) => {
    Likes.remove(req.body)
      .then((howTo) => {
        HowTos.update({ id: howTo.id }, { likes: howTo.likes - 1 })
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
