import app from "./app";
import config from "./utils/config";
import http from 'node:http';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});