import { notFoundError, invalidTicketError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function checkUserById(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw invalidTicketError();
  }
}

async function getHotelsByUserId(userId: number) {
  await checkUserById(userId);

  const hotels = await hotelRepository.findHotels();
  return hotels;
}

async function getRoomsOfHotel(userId: number, hotelId: number) {
  await checkUserById(userId);

  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }

  return hotel;
}

export default { getHotelsByUserId, getRoomsOfHotel };
