const dbConnection = process.env.DATABASE_URL;

const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    }
  }
};
module.exports = {
  development: {
    ...sqlite,
    connection: {
      filename: "./data/dev.db3"
    }
  },

  test: {
    ...sqlite,
    connection: {
      filename: "./data/test.db3"
    }
  },

  production: {
    client: "pg",
    connection: dbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
