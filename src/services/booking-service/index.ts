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
  const bookings = await bookingRepository.findBookingByRoomId(roomId);
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

async function changeRoom(userId: number, roomId: number) {
  await checkValidBooking(roomId);
  const booking = await bookingRepository.findBooking(userId);

  if (!booking || booking.userId !== userId) {
    throw cannotBookingError();
  }

  return bookingRepository.upsertBooking({
    id: booking.id,
    roomId,
    userId,
  });
}

const bookingService = { getBooking, registerBooking, changeRoom };

export default bookingService;
