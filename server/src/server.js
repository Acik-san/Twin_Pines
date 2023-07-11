const http = require('http');
const { createConnection } = require('./socketInit');
const app = require('./app');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server started at port: ' + PORT);
});

createConnection(server);
