import { Router } from 'express';

export const PingRouter = Router();
export default PingRouter;

// GET /ping
PingRouter.get('/', (req, res) => res.status(200).json({status: 'OK'}))