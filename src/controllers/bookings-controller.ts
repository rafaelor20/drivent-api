import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import bookingService from '../services/bookings-service/index';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (e) {
    next(e);
  }
}

export async function registerBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const booking = await bookingService.registerBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (e) {
    if (e.name === 'CannotBookingError') {
      return res.status(403).send(e.message);
    }
    next(e);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const bookingId = Number(req.params.bookingId);

    if (!bookingId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const { roomId } = req.body;

    if (!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.changeRoom(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === 'CannotBookingError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
