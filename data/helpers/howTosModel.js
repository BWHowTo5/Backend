const db = require("../dbConfig.js");

// GET all How-Tos
const find = () => {
  return db("how-tos");
};

// GET How-To by filter
const findBy = (filter) => {
  return db("how-tos")
    .where(filter)
    .first();
};

// POST new How-To
const add = async (howTo) => {
  const [id] = await db("how-tos").insert(howTo);

  return findBy(id);
};

// UPDATE a How-To
const update = (filter, changes) => {
  return db("how-to")
    .where(filter)
    .update(changes);
};

// REMOVE a How-To
const remove = (filter) => {
  return db("how-to")
    .where(filter)
    .del();
};

module.exports = { find, findBy, add, update, remove };
