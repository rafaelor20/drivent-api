import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotelsByUserId } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotelsByUserId);
//  .get('/:hotelId', validateBody(ticketsSchema), createTicket);

export { hotelsRouter };
