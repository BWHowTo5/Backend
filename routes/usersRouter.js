const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const Users = require("../data/helpers/usersModel.js");
const {
  validateUserId,
  validateUserRegister,
  validateUserLogin,
  validateUserPut,
  restricted
} = require("../middleware/usersMiddleware.js");

// GET "/api/users"
router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      const payload = users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          creator: user.creator
        };
      });
      res.json(payload);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET "/api/users/:id"
router.get("/:id", restricted, validateUserId, (req, res) => {
  res.json(req.user);
});

// POST "/api/users/register"
router.post("/register", validateUserRegister, (req, res) => {
  Users.add(req.body)
    .then((user) => {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        creator: user.creator
      };
      req.session.user = user;
      res.status(201).json(payload);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST "/api/users/login"
router.post("/login", validateUserLogin, (req, res) => {
  const { email, password } = req.body;

  Users.findBy({ email })
    .then((user) => {
      const validatedPassword = bcrypt.compareSync(password, user.password);

      if (user && validatedPassword) {
        req.session.user = user;

        res.json({ message: `${user.username} has logged in successfully!` });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT "/api/users/:id"
router.put("/:id", validateUserPut, validateUserId, (req, res, next) => {
  Users.update({ id: req.params.id }, req.body)
    .then((user) => {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        creator: user.creator
      };
      res.status(200).json(payload);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE "/api/users/:id"
router.delete("/:id", validateUserId, (req, res) => {
  Users.remove({ id: req.params.id })
    .then((count) =>
      res.status(200).json({ message: `${count} record was deleted.` })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
