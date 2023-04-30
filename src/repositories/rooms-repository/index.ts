import { prisma } from '@/config';

async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function findAllByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
  });
}

const roomRepository = {
  findAllByHotelId,
  findById,
};

export default roomRepository;
