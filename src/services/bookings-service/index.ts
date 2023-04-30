import bookingRepository from '@/repositories/booking-repository';
import roomRepository from '@/repositories/rooms-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import tikectRepository from '@/repositories/tickets-repository';
import { notFoundError, cannotBookingError } from '@/errors';

async function checkEnrollmentTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw cannotBookingError();
  }
  const ticket = await tikectRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookingError();
  }
}

async function checkValidBooking(roomId: number) {
  const room = await roomRepository.findById(roomId);
  const bookings = await bookingRepository.findByRoomId(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.capacity <= bookings.length) {
    throw cannotBookingError();
  }
}

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();
  return booking;
}

async function registerBooking(userId: number, roomId: number) {
  await checkEnrollmentTicket(userId);
  await checkValidBooking(roomId);
  return bookingRepository.create({ roomId, userId });
}

const bookingService = { getBooking, registerBooking };

export default bookingService;
