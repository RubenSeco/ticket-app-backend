
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");  
const path = require("path");
const Sockets = require("./sockets");


class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);
    this.port = process.env.PORT;
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "/public")));
  }

  sockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.sockets();
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;