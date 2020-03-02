const db = require("../dbConfig.js");

// GET all users
const find = () => {
  return db("users");
};

// GET user by filter
const findById = (filter) => {
  return db("users")
    .where(filter)
    .first();
};

// POST new user
const add = async (user) => {
  const [id] = await db("users").insert(user);

  return findById(id);
};

// UPDATE a user
const update = (filter, changes) => {
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

module.exports = { find, findById, add, update, remove };
