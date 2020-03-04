require("dotenv").config();

const server = require("./server.js");
const PORT = process.env.PORT;

if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`\n=== Server listening on PORT ${PORT} ===\n`);
  });
}

module.exports = server;
