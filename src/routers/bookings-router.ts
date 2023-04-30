import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking, registerBooking } from '@/controllers/bookings-controller';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).get('/', getBooking).post('/', registerBooking);
//.put('/', validateBody(ticketsSchema), createTicket);

export { bookingsRouter };
