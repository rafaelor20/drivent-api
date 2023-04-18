import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayments).post('/process');

export { paymentsRouter };
