import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const userId = req.userId;

    if (!ticketId) {
      return res.status(httpStatus.BAD_REQUEST).send('Ticket id is required');
    }

    const payment = await paymentsService.getPayments(Number(userId), ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    } else {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function registerPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketId, cardData } = req.body;

    if (!ticketId || !cardData) {
      return res.status(httpStatus.BAD_REQUEST).send('Ticket id and Card data are required');
    }
    const payment = await paymentsService.registerPayment(ticketId, userId, cardData);

    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
