import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/types', getTicketTypes).get('/').all('/*', authenticateToken);

export { ticketsRouter };
