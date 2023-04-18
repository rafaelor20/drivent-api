import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments, registerPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayments).post('/process', registerPayment);

export { paymentsRouter };
