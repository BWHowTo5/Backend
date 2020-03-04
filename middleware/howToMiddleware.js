const HowTos = require("../data/helpers/howTosModel.js");

const validateHowToPost = (req, res, next) => {
  if (!req.body.title || !req.body.content || !req.body.user_id) {
    res
      .status(400)
      .json({ message: "Missing required title, content or user_id." });
  } else {
    next();
  }
};

const validateHowToPut = (req, res, next) => {
  const howToKeys = Object.keys(req.body);

  let payload = {};

  howToKeys.forEach((item) => {
    if (
      item === "title" ||
      item === "summary" ||
      item === "content" ||
      item === "likes" ||
      item === "dislikes" ||
      item === "user_id"
    ) {
      payload = { ...payload, [item]: req.body[item] };

      if (item === howToKeys[howToKeys.length - 1]) {
        req.body = payload;
        next();
      }
    } else {
      res.status(500).json({ message: `There is no ${item} column.` });
    }
  });
};

const validateHowToId = (req, res, next) => {
  HowTos.findBy({ id: req.params.id })
    .then((howTo) => {
      if (!howTo) {
        res
          .status(404)
          .json({ message: "The specified How-To does not exist." });
      } else {
        req.howTo = howTo;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  validateHowToPost,
  validateHowToPut,
  validateHowToId
};
