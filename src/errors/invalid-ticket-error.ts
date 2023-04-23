import { ApplicationError } from '@/protocols';

export function invalidTicketError(): ApplicationError {
  return {
    name: 'invalidTicket',
    message: 'Ticket is invalid',
  };
}
