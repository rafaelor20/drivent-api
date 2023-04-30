import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();
  return booking;
}

const bookingService = { getBooking };

export default bookingService;
