import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function verifyTicketUser(ticketId: number, userId: number) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.getById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPayments(userId: number, ticketId: number) {
  await verifyTicketUser(ticketId, userId);

  const payment = await paymentRepository.getPayment(ticketId);

  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

const paymentsService = {
  getPayments,
};

export default paymentsService;
