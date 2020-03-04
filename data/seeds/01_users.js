exports.seed = async function(knex) {
  await knex("users").insert([
    {
      username: "autobot-leader",
      email: "frompaxtoprime@autobots.com",
      password: "oneshallstand",
      creator: true
    },
    {
      username: "all-hail-me",
      email: "peace-through-tyranny@decepticons.com",
      password: "oneshallfall",
      creator: true
    },
    {
      username: "autobot-medic",
      email: "ratchet@autobots.com",
      password: "1n33d3dth4t!",
      creator: false
    },
    {
      username: "cassette-master",
      email: "ejeeeect@decepticons.com",
      password: "autobotsinferior",
      creator: false
    }
  ]);
};
