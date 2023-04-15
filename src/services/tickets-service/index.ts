import ticketRepository from '@/repositories/tickets-repository';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  return ticketTypes;
}

async function getTickets() {
  const tickets = await ticketRepository.getTickets();
  return tickets;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
};

export default ticketsService;
