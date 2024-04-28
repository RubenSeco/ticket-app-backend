const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {

      console.log('Cliente conectado');

      socket.on('newTicket', (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);

      });

      socket.on('next-ticket', ({ agent, desktop }, callback) => {
        const nextTicket = this.ticketList.assignTicket(agent, desktop);
        callback(nextTicket);

      });

      this.io.emit('ticket-assigned', this.ticketList.lastTickets);
    });
  }
}

module.exports = Sockets;