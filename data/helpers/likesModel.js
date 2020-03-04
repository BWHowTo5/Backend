const db = require("../dbConfig.js");
const HowTos = require("./howTosModel.js");

// GET likes by filter
const findBy = (filter) => {
  return db("likes")
    .where(filter)
    .first();
};

// POST new like
const add = async (like) => {
  await db("likes").insert(like);

  return HowTos.findBy({ id: like.how_to_id });
};

// REMOVE a like
const remove = async (filter) => {
  await db("likes")
    .where(filter)
    .del();

  return HowTos.findBy({ id: filter.how_to_id });
};

module.exports = { findBy, add, remove };
