exports.seed = async function(knex) {
  await knex("users").insert([
    {
      id: 1,
      username: "autobot-leader",
      email: "frompaxtoprime@autobots.com",
      password: "oneshallstand",
      creator: true
    },
    {
      id: 2,
      username: "all-hail-me",
      email: "peace-through-tyranny@decepticons.com",
      password: "oneshallfall",
      creator: true
    },
    {
      id: 3,
      username: "autobot-medic",
      email: "ratchet@autobots.com",
      password: "1n33d3dth4t!",
      creator: false
    },
    {
      id: 4,
      username: "cassette-master",
      email: "ejeeeect@decepticons.com",
      password: "autobotsinferior",
      creator: false
    }
  ]);
};
