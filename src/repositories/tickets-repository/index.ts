import { Ticket, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getTickets() {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketRepository = {
  getTicketTypes,
  getTickets,
  createTicket,
  findTicketByEnrollmentId,
};

export default ticketRepository;
