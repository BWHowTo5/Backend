require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const dbConfig = require("./data/dbConfig.js");
const HowTosRouter = require("./routes/howTosRouter.js");
const UsersRouter = require("./routes/usersRouter.js");
const LikesRouter = require("./routes/likesRouter.js");
const DislikesRouter = require("./routes/dislikesRouter.js");

const { restricted } = require("./middleware/usersMiddleware.js");

const server = express();

server.use(cors());
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
server.use("/api/likes", restricted, LikesRouter);
server.use("/api/dislikes", restricted, DislikesRouter);

module.exports = server;
