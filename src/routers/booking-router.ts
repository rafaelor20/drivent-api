import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBooking, registerBooking, changeBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', registerBooking)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
