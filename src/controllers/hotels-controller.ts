import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotelsByUserId(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { userId } = req;
    const hotels = await hotelsService.getHotelsByUserId(userId);

    if (hotels.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send([]);
    }

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'invalidTicket') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRoomsOfHotel(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { userId } = req;
    const { hotelId } = req.params;

    const hotel = await hotelsService.getRoomsOfHotel(Number(userId), Number(hotelId));

    if (hotel === null) {
      return res.status(httpStatus.NOT_FOUND).send([]);
    }

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'invalidTicket') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
