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
    console.log(error);
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    } else {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
