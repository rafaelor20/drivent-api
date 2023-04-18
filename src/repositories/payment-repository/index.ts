import { prisma } from '@/config';

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = {
  getPayment,
};

export default paymentRepository;
