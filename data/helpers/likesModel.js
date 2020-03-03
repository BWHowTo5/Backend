const db = require("../dbConfig.js");

// GET likes by filter
const findBy = (filter) => {
  return db("likes")
    .where(filter)
    .first();
};

// POST new like
const add = async (like) => {
  const [id] = await db("likes").insert(like);

  return findBy(id);
};

// REMOVE a like
const remove = (filter) => {
  return db("likes")
    .where(filter)
    .del();
};

module.exports = { findBy, add, remove };
