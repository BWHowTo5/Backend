exports.seed = async function(knex) {
  await knex("likes").insert([
    {
      user_id: 1,
      how_to_id: 2
    },
    {
      user_id: 4,
      how_to_id: 2
    },
    {
      user_id: 3,
      how_to_id: 1
    },
    {
      user_id: 4,
      how_to_id: 1
    },
    {
      user_id: 4,
      how_to_id: 3
    },
    {
      user_id: 1,
      how_to_id: 4
    },
    {
      user_id: 2,
      how_to_id: 4
    },
    {
      user_id: 3,
      how_to_id: 4
    }
  ]);
};
