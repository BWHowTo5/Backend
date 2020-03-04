const express = require("express");
const server = express();

const HowTosRouter = require("./routes/howTosRouter.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(`
    <div>
        <h1>Server is running...</h1>
    </div>
    `);
});

server.use("/api/how-tos", HowTosRouter);

module.exports = server;
