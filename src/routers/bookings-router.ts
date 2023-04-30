import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking } from '@/controllers/bookings-controller';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).get('/', getBooking);
//.post('/', getTickets)
//.put('/', validateBody(ticketsSchema), createTicket);

export { bookingsRouter };
