const Users = require("../data/helpers/usersModel.js");

const restricted = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res
      .status(401)
      .json({ message: "You are not authorized to complete this action." });
  } else {
    next();
  }
};

const validateUserId = (req, res, next) => {
  Users.findBy({ id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "The specified user does not exist." });
      } else {
        req.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          creator: user.creator
        };
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const validateUserRegister = (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.creator
  ) {
    res.status(400).json({
      message: "Missing required username, email, password, or creator."
    });
  } else {
    next();
  }
};

const validateUserLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Missing required username or password." });
  } else {
    next();
  }
};

const validateUserPut = (req, res, next) => {
  const userKeys = Object.keys(req.body);

  let payload = {};

  userKeys.forEach((item) => {
    if (
      item === "username" ||
      item === "email" ||
      item === "password" ||
      item === "creator"
    ) {
      payload = { ...payload, [item]: req.body[item] };

      if (item === userKeys[userKeys.length - 1]) {
        req.body = payload;
        next();
      }
    } else {
      res.status(500).json({ message: `There is no ${item} column.` });
    }
  });
};

module.exports = {
  restricted,
  validateUserId,
  validateUserRegister,
  validateUserLogin,
  validateUserPut
};
