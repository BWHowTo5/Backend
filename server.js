require("dotenv").config();
const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const dbConfig = require("./data/dbConfig.js");
const HowTosRouter = require("./routes/howTosRouter.js");
const UsersRouter = require("./routes/usersRouter.js");
const { restricted } = require("./middleware/usersMiddleware.js");

const server = express();

server.use(express.json());

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      httpOnly: true
    },
    store: new KnexSessionStore({
      knex: dbConfig,
      createtable: true
    })
  })
);

server.get("/", (req, res) => {
  res.status(200).send(`
    <div>
        <h1>Server is running...</h1>
    </div>
    `);
});

server.use("/api/users", UsersRouter);
server.use("/api/how-tos", restricted, HowTosRouter);

module.exports = server;
