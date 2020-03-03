const db = require("../dbConfig.js");

// GET dislikes by filter
const findBy = (filter) => {
  return db("dislikes")
    .where(filter)
    .first();
};

// POST new dislike
const add = async (dislike) => {
  const [id] = await db("dislikes").insert(dislike);

  return findBy(id);
};

// REMOVE a dislike
const remove = (filter) => {
  return db("dislikes")
    .where(filter)
    .del();
};

module.exports = { findBy, add, remove };
