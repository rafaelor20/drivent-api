import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import bookingService from '../services/bookings-service/index';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);

    console.log(booking);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (e) {
    next(e);
  }
}
