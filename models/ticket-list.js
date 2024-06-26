const Ticket = require("./ticket");

class TicketList {

  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.assigned = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get lastTickets() {
    return this.assigned.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desktop) {

    if (this.pending.length === 0) {
      return null;
    }

    const nextTicket = this.pending.shift();
    nextTicket.desktop = desktop;
    nextTicket.agent = agent;

    this.assigned.unshift(nextTicket);
    return nextTicket;
  }
}

module.exports = TicketList;

