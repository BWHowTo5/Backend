const db = require("../dbConfig.js");
const bcrypt = require("bcryptjs");

// GET all users
const find = () => {
  return db("users");
};

// GET user by filter
const findBy = (filter) => {
  return db("users")
    .where(filter)
    .first();
};

// POST new user
const add = async (user) => {
  user.password = await bcrypt.hash(user.password, 13);

  const [id] = await db("users").insert(user);

  return findBy(id);
};

// UPDATE a user
const update = async (filter, changes) => {
  const user = findBy(filter);
  const { oldPassword } = user;
  const validatedPassword = bcrypt.compareSync(oldPassword, changes.password);

  if (!validatedPassword) {
    changes.password = await bcrypt.hash(changes.password, 13);
  }

  return db("users")
    .where(filter)
    .update(changes);
};

// REMOVE a user
const remove = (filter) => {
  return db("users")
    .where(filter)
    .del();
};

module.exports = { find, findBy, add, update, remove };
