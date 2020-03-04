exports.up = async function(knex) {
  // USERS
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    tbl.string("email", 128).notNullable();
    tbl.string("password", 128).notNullable();
    tbl.boolean("creator").notNullable();
  });

  // HOW-TOS
  await knex.schema.createTable("how-tos", (tbl) => {
    tbl.increments("id");
    tbl.string("title", 128).notNullable();
    tbl.string("summary", 255);
    tbl.text("content", 5000).notNullable();
    tbl
      .integer("likes")
      .unsigned()
      .defaultTo(0);
    tbl
      .integer("dislikes")
      .unsigned()
      .defaultTo(0);
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
  });

  // LIKES
  await knex.schema.createTable("likes", (tbl) => {
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
    tbl
      .integer("how_to_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("how-tos");
    tbl.primary(["user_id", "how_to_id"]);
  });

  // DISLIKES
  await knex.schema.createTable("dislikes", (tbl) => {
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
    tbl
      .integer("how_to_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("how-tos");
    tbl.primary(["user_id", "how_to_id"]);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("dislikes");
  await knex.schema.dropTableIfExists("likes");
  await knex.schema.dropTableIfExists("how-tos");
  await knex.schema.dropTableIfExists("users");
};
