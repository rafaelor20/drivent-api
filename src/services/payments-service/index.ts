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

async function registerPayment(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await verifyTicketUser(ticketId, userId);

  const ticket = await ticketRepository.getTicketWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.registerPayment(ticketId, paymentData);

  await ticketRepository.ticketRegisterPayment(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentsService = {
  getPayments,
  registerPayment,
};

export default paymentsService;
