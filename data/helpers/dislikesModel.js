const db = require("../dbConfig.js");
const HowTos = require("./howTosModel.js");

// GET likes by filter
const findBy = (filter) => {
  return db("dislikes")
    .where(filter)
    .first();
};

// POST new like
const add = async (dislike) => {
  await db("dislikes").insert(dislike);

  return HowTos.findBy({ id: dislike.how_to_id });
};

// REMOVE a like
const remove = async (filter) => {
  await db("dislikes")
    .where(filter)
    .del();

  return HowTos.findBy({ id: filter.how_to_id });
};

module.exports = { findBy, add, remove };
