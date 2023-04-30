import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId: roomId,
      userId: userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findBooking,
};

export default bookingRepository;
