const Likes = require("../data/helpers/likesModel.js");

const validateLikeShape = (req, res, next) => {
  if (!req.body.user_id || !req.body.how_to_id) {
    res.status(400).json({ message: "Missing required user_id or how_to_id" });
  } else {
    next();
  }
};

const validateLikeExistingPost = (req, res, next) => {
  Likes.findBy(req.body)
    .then((like) => {
      if (like) {
        res.status(400).json({ message: "That like already exists." });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const validateLikeExistingDelete = (req, res, next) => {
  Likes.findBy(req.body)
    .then((like) => {
      if (!like) {
        res.status(400).json({ message: "That like does not exist." });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  validateLikeShape,
  validateLikeExistingPost,
  validateLikeExistingDelete
};
