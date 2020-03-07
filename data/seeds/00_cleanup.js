exports.seed = async function(knex) {
  await knex("dislikes").truncate();
  await knex("likes").truncate();
  await knex("how-tos").truncate();
  await knex("users").truncate();
};
