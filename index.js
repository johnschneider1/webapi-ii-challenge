const server = require("./server.js");

const port = 5672;

server.listen(port, () => console.log(`\n api on port ${port} \n `));
