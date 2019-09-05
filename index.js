require("dotenv").config();

const server = require("./server.js");

// const port = 5672; Make it dynamic

const port = process.env.PORT || 5555;

// server.listen(port, () => console.log(`\n api on port ${port} \n `));

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
