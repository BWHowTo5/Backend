exports.seed = async function(knex) {
  await knex("dislikes").del();
  await knex("likes").del();
  await knex("how-tos").del();
  await knex("users").del();
};
