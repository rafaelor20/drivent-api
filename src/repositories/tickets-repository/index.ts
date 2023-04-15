import { prisma } from '@/config';

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getTickets() {
  return prisma.ticket.findMany();
}

const ticketRepository = {
  getTicketTypes,
  getTickets,
};

export default ticketRepository;
