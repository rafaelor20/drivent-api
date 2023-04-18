import { TicketStatus } from '@prisma/client';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError } from '@/errors';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  return ticketTypes;
}

async function getTickets() {
  const tickets = await ticketRepository.getTickets();
  return tickets;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
  createTicket,
};

export default ticketsService;
