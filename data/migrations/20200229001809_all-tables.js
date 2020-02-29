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
    tbl
      .boolean("creator")
      .notNullable()
      .defaultTo(false);
  });

  // HOW-TOS
  await knex.schema.createTable("how-tos", (tbl) => {
    tbl.increments("id");
    tbl.string("title", 128).notNullable();
    tbl.string("summary", 255);
    tbl.text("content", 5000).notNullable();
    tbl
      .integer("likes")
      .notNullable()
      .unsigned()
      .defaultTo(0);
    tbl
      .integer("dislikes")
      .notNullable()
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
      .integer("how-to_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("how-tos");
    tbl.primary(["user_id", "how-to_id"]);
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
      .integer("how-to_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("how-tos");
    tbl.primary(["user_id", "how-to_id"]);
  });
};

exports.down = function(knex) {
    await knex.schema.dropTableIfExists("dislikes");
    await knex.schema.dropTableIfExists("likes");
    await knex.schema.dropTableIfExists("how-tos");
    await knex.schema.dropTableIfExists("users");
};
