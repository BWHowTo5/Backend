const Dislikes = require("../data/helpers/dislikesModel.js");

const validateDislikeShape = (req, res, next) => {
  if (!req.body.user_id || !req.body.how_to_id) {
    res.status(400).json({ message: "Missing required user_id or how_to_id" });
  } else {
    next();
  }
};

const validateDislikeExistingPost = (req, res, next) => {
  Dislikes.findBy(req.body)
    .then((dislike) => {
      if (dislike) {
        res.status(400).json({ message: "That dislike already exists." });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const validateDislikeExistingDelete = (req, res, next) => {
  Dislikes.findBy(req.body)
    .then((dislike) => {
      if (!dislike) {
        res.status(400).json({ message: "That dislike does not exist." });
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
  validateDislikeShape,
  validateDislikeExistingPost,
  validateDislikeExistingDelete
};
