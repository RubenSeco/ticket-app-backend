
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");  
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);
    this.sockets = new Sockets(this.io);

  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "/public")));

    // Configurar CORS
    this.app.use(cors());

    // Get de los ultimos tickets
    this.app.get("/last", (req, res) => {

      res.json({
        ok: true,
        last: this.sockets.ticketList.lastTickets
      });

    })
  }

  // sockets() {
  //   new Sockets(this.io);
  // }

  execute() {
    this.middlewares();
    // this.sockets();
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;