import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const tickets = await ticketsService.getTickets(token);
    return res.status(httpStatus.OK).send(tickets);
  } catch {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
