import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelsByUserId, getRoomsOfHotel } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotelsByUserId).get('/:hotelId', getRoomsOfHotel);

export { hotelsRouter };
