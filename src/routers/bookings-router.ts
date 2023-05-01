import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBooking, registerBooking, changeBooking } from '@/controllers/booking-controller';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', registerBooking)
  .put('/:bookingId', changeBooking);

export { bookingsRouter };
