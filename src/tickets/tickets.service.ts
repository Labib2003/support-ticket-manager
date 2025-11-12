import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TicketsService {
  private tickets = [];

  findMany() {
    return this.tickets;
  }

  findOne(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found`);
    return ticket;
  }

  create(data: Record<string, unknown>) {
    this.tickets.push({ ...data, id: this.tickets.length + 1 });
    return this.findOne(this.tickets.length);
  }

  update(id: number, data: Record<string, unknown>) {
    this.tickets = this.tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, ...data } : ticket,
    );
    return this.findOne(id);
  }

  delete(id: number) {
    const deletedTicket = this.findOne(id);
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);

    return deletedTicket;
  }
}
