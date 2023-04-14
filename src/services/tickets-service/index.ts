//import { TicketType, Ticket } from '@prisma/client';
import { CommerceProductNameDefinitions } from '@faker-js/faker';
import ticketRepository from '@/repositories/tickets-repository';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  return ticketTypes;
}

async function getTickets(token: string) {
  const tickets = await ticketRepository.getTickets(token);
  console.log(tickets);
  return tickets;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
};

export default ticketsService;
