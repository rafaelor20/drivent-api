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
    const ticket = await ticketsService.getTickets();
    if (ticket === null) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.status(httpStatus.OK).send(ticket);
    }
  } catch {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    if (isNaN(req.body.ticketTypeId)) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else {
      const ticketTypeId = req.body.ticketTypeId;
      const ticket = await ticketsService.createTicket(userId, ticketTypeId);
      return res.status(httpStatus.CREATED).send(ticket);
    }
  } catch {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
